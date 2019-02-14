import { Map } from 'immutable'

import {
  LOAD_STREAM_REQUEST,
  LOAD_STREAM_SUCCESS,
  LOAD_STREAM_FAILURE,
  CHART_HOVERED,
} from '../actions/streams'

// TODO: make sure we're not using anti-patterns
// https://tech.affirm.com/redux-patterns-and-anti-patterns-7d80ef3d53bc

const streamsReducer = (
  state = Map({
    isFetching: null,
    comid: null,
    data: null,
    hoveredMetric: null,
    hoveredMonth: null,
    hoveredMonthData: null,
  }),
  action
) => {
  switch (action.type) {

    case CHART_HOVERED:
      return state.withMutations(s => {
        s.set('hoveredMetric', action.hoveredMetric)
        s.set('hoveredMonth', action.hoveredMonth)
        s.set('hoveredMonthData', action.hoveredMonthData)
      })
    case LOAD_STREAM_REQUEST:
      return state.set('isFetching', action.isFetching)

    case LOAD_STREAM_SUCCESS:
      return state.withMutations(s => {
        s.set('isFetching', action.isFetching)
        s.set('comid', action.comid)
        s.set('data', action.data)
        s.set('lastUpdate', action.receivedAt)
      })

    case LOAD_STREAM_FAILURE:
      return state.set('isFetchingCOMID', action.isFetching)

    default:
      return state
  }
}

export default streamsReducer
