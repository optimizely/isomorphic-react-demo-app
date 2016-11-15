import { renderToString } from 'react-dom/server'
import { RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../../common/store/configure_store'
import React from 'react'

/**
 * Renders the React app
 * @param  {Object} renderProps
 * @param  {Object} state       The state to populate our redux store with
 * @return {string}             The rendered HTML
 */
export const renderReactApp = (renderProps, state) => {
  // Create a new Redux store instance
  const store = configureStore(state)
  const html = renderToString(
    <Provider store={ store }>
      <RouterContext { ...renderProps } />
    </Provider>
  )
  return html
}

/**
 * Render the full HTML page to display to the user
 * @param  {Object} data
 * @param  {Object} data.html
 * @param  {Object} data.datafile
 * @param  {Object} data.preloadedState
 * @return {string} the fully render HTML
 */
export const renderFullPage = (data) => {
  return `
    <!doctype html>
    <html>
      <head>
        <link rel="stylesheet" href="https://oui.cdn.optimizely.com/18.2.0/oui.css">
        <link rel="stylesheet" href="/public/app.css">
        <script type="text/javascript" src="/public/optimizely.min.js"></script>
        <title>Attic and Button</title>
      </head>
      <body>
        <div id="app">${data.html}</div>
        <script>
          window.__OPTIMIZELY_DATAFILE__ = ${JSON.stringify(data.datafile)}
          window.__PRELOADED_STATE__ = ${JSON.stringify(data.preloadedState).replace(/</g, '\\x3c')}
          var optimizely = window.optimizelyClient.createInstance({datafile: window.__OPTIMIZELY_DATAFILE__});

          optimizely.getVariation("sorting_experiment", window.__PRELOADED_STATE__.currentUserId)
        </script>
        <script src="/public/main.js"></script>
      </body>
    </html>
  `
}
