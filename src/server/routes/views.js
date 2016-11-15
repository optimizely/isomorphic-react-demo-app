import _ from 'lodash'
import { match } from 'react-router';
import { reactRoutes } from '../../common/routes'
import enums from '../../common/utils/enums'
import optimizelyManager from '../../common/utils/optimizely_manager'
import {
  renderFullPage,
  renderReactApp,
} from '../services/page_template'
import itemService from '../services/items'
import uuid from 'uuid-v4'

/**
 *
 * Handles rendering the app's views using React
 * This route is a catch all route and will catch everything that
 * doesn't hit the /api or /public paths
 * @param  {Object} request
 * @param  {Object} reply
 */
const viewHandler = function(request, reply) {
  // create a session and store in the user's cookie
  // we use this session value as the user id to activate and track our experiments
  let user = request.yar.get('attic_and_button_shop_user')
  if (!user) {
    // create a user id for unknown users and use that id for subsequent sessions
    user = { key: uuid() }
    request.yar.set('attic_and_button_shop_user', user)
  }

  // this is used by our react router to determine which component to render
  const location = request.url.path

  // Activate the user for the sorting experiment
  optimizelyManager.getInstance()
    .then((optimizelyInstance) => {
      const variation = optimizelyInstance.activate(enums.EXPERIMENT_KEYS.SORTING_EXPERIMENT, user.key)

      // Use the variation key to determine the property we are sorting on
      const sortBy = variation === enums.VARIATION_KEYS.SORT_BY_PRICE ? 'price' : 'name'
      const data = itemService.getItems(sortBy)

      // Match the routes using the react router, which determines which component to render based on the route
      match(
        {
          routes: reactRoutes,
          location,
        },
        (err, redirectLocation, renderProps) => {
          if (err) {
            console.log(err);
          }

          if (renderProps) {
            // Compile an initial state for our store so we can render on the server side
            const preloadedState = {
              currentUserId: user.key,
              optimizelyExperimentData: {},
              items: data,
            }

            // conditionally activate the checkout flow experiment if the user is in the checkout page
            if (location === enums.ROUTES.CHECKOUT) {
              const checkoutFlowVariation = optimizelyInstance.activate(enums.EXPERIMENT_KEYS.CHECKOUT_FLOW_EXPERIMENT, user)
              preloadedState.optimizelyExperimentData[enums.EXPERIMENT_KEYS.CHECKOUT_FLOW_EXPERIMENT] = checkoutFlowVariation
            }

            // Render our React App
            const html = renderReactApp(renderProps, preloadedState)

            // Render React App with the rest of the HTML body
            const fullHtml = renderFullPage(
              {
                datafile: optimizelyManager.getDatafile(),
                html,
                preloadedState,
                variation,
              }
            )

            return reply(fullHtml).type('text/html')
          }
        }
      )
    })
}

module.exports = [
  {
    method: 'GET',
    path: '/{path*}',
    handler: viewHandler,
  },
]
