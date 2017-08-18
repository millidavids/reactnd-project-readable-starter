import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

/**
* @description Enhancers for redux
*/
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

/**
* @description The redux store initialization
*/
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(logger),
  )
)

/**
* @description Rendering the root components into the DOM
*/
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
