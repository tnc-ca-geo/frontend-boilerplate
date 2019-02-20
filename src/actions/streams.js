import { csv } from 'd3'
// import { normalize } from 'normalizr'
import { fromJS } from 'immutable'
import { NATURAL_FLOWS_API } from '../config/data'
// import breedsListSchema from '../schemas/breed'

export const CHART_HOVERED = 'CHART_HOVERED'
export function chartHovered(closestMonthData, closestMetric) {
  return {
    type: CHART_HOVERED,
    hoveredMetric: closestMetric,
    hoveredMonth: closestMonthData[0].data.month,
    hoveredMonthData: fromJS(closestMonthData),
  }
}

export const LOAD_STREAM_REQUEST = 'LOAD_STREAM_REQUEST'
export function loadStreamRequest() {
  return {
    type: LOAD_STREAM_REQUEST,
    isFetching: true,
  }
}

export const LOAD_STREAM_SUCCESS = 'LOAD_STREAM_SUCCESS'
export function loadStreamSuccess(comid, data) {
  return {
    type: LOAD_STREAM_SUCCESS,
    comid: comid,
    data: data,
    receivedAt: Date.now(),
    isFetching: false,
  }
}

export const LOAD_STREAM_FAILURE = 'LOAD_STREAM_FAILURE'
export function loadStreamFailure() {
  return {
    type: LOAD_STREAM_FAILURE,
    isFetching: false,
  }
}

const DEFAULT_QUERY = { statistics: 'mean' }

function buildURL(queryParams) {
  let url = new URL(NATURAL_FLOWS_API)
  const query = { ...DEFAULT_QUERY, ...queryParams }
  Object.keys(query).forEach(key =>
    url.searchParams.append(key, query[key])
  )
  return url
}

export function fetchFlowData(queryParams) {
  return function(dispatch, getState) {

    dispatch(loadStreamRequest())

    const url = buildURL(queryParams)
    return csv(url, d => ({
        comid: +d.comid,
        statistic: d.statistic,
        month: +d.month,
        value: +d.value,
        variable: d.variable,
        year: +d.year,
      }))
      .then(
        data => fromJS(data), // convert to Immutable List of Maps
        error => console.log('An error occurred.', error) // Don't use catch()
      )
      .then(
        data => {
          dispatch(loadStreamSuccess(queryParams.comids, data))
        }
      )
  }
}
