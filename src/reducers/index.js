import { combineReducers } from 'redux-immutable'
import { connectRouter } from 'connected-react-router/immutable'
// import counterReducer from './counter'
// import catReducer from './catFetcher'
// import apiReducer from './api'
import streamsReducer from './streams'


const rootReducer = (history) => combineReducers({
  // api: apiReducer,
  // count: counterReducer,
  // cat: catReducer,
  streams: streamsReducer,
  router: connectRouter(history)
})


export default rootReducer
