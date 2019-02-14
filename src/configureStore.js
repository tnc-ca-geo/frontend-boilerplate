import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import { routerMiddleware } from 'connected-react-router/immutable'
import loggerMiddleware from './middleware/logger'
import history from './history'


const configureStore = (preloadedState) => {
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    rootReducer(history),
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware,
        loggerMiddleware,
      )
    ),
  )
  return store
}

export default configureStore
