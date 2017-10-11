import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducers from './reducers'
import App from './components/App'
import './stylesheets/index.css'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk),
    applyMiddleware(logger),
  )
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={App}/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
