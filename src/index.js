import '@babel/polyfill';
import './config';
import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import './css/main.scss'    // should this be .css instead?
import 'bootstrap/dist/css/bootstrap.css'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import App from './App'
import rootReducer from './reducers'
import history from './history'
import configureStore from './configureStore'

export const store = configureStore()


const render = () => ReactDOM.render(
  <AppContainer>
    <Provider store={ store }>
      <App history={ history } />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
)


render()

// Hot reloading
// allows for updating components while maintaining state
// https://github.com/supasate/connected-react-router/blob/e444615c281bcb4d518636bee2666d1e9357bf8e/examples/basic/src/index.js
if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    render()
  })
  // Reload reducers
  module.hot.accept('./reducers', () => {
    store.replaceReducer(rootReducer(history))
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
