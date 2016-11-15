/**
 * Entry point for the client-side bundle to load on the Single Page App
 */
import 'babel-polyfill'
import React from 'react'
import { Router, browserHistory } from 'react-router';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from '../common/store/configure_store'
import { reactRoutes } from '../common/routes'

// we're cheating a bit and preloading the redux store state here
// in a real prod app we'd probably still rely on fetching data
// from the server and updating the store accordingly. However,
// we wouldn't have to make it a blocking call and instead can
// defer it until after the page is fully loaded and rendered.
const preloadedState = window.__PRELOADED_STATE__
const store = configureStore(preloadedState)
const rootElement = document.getElementById('app')

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      { reactRoutes }
    </Router>
  </Provider>,
  rootElement
)
