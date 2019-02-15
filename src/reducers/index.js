import { combineReducers } from 'redux-immutable'
import { connectRouter } from 'connected-react-router/immutable'
import streamsReducer from './streams'
import mapReducer from './map'


const rootReducer = (history) => combineReducers({
  map: mapReducer,
  streams: streamsReducer,
  router: connectRouter(history)
})


export default rootReducer
