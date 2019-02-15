import { applyMiddleware, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import { routerMiddleware } from 'connected-react-router/immutable'
import loggerMiddleware from './middleware/logger'
import arcgisMiddleWare from './middleware/arcgis-mapview'
import history from './history'


const configureStore = (preloadedState) => {
  
  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const store = createStore(
    rootReducer(history),
    preloadedState,
    composeEnhancer(
      applyMiddleware(
        routerMiddleware(history),
        thunkMiddleware,
        loggerMiddleware,
        arcgisMiddleWare
      )
    ),
  )
  return store
}

export default configureStore
