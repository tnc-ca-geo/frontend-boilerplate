// import { toArray, toObject } from 'immutable'
import { createSelector } from 'reselect'

// TODO: use reselct library to create and compose memoized selector functions
// https://redux.js.org/recipes/computing-derived-data#sharing-selectors-across-multiple-components
// https://blog.isquaredsoftware.com/2017/12/idiomatic-redux-using-reselect-selectors/

//------------------------------------------------------------------------------
// Map slice
//------------------------------------------------------------------------------

export const getLayerURLs = state =>
  state.getIn(['map', 'layerURLs'])

export const getSelectedFeature = state =>
  state.getIn(['map', 'selectedFeature'])

export const getStreamAttributes = createSelector(
  [getSelectedFeature],
  (feature) => {
    console.log('selected feature: ', feature);
    if (feature.getIn(['layerGroup']) === 'streams') {
      const attributes = feature.getIn(['feature', 'attributes'])
      return attributes
    }
  }
)

//------------------------------------------------------------------------------
// Streams slice
//------------------------------------------------------------------------------

export const getComid = state =>
  state.getIn(['streams', 'comid'])

export const getFlowData = state =>
  state.getIn(['streams', 'data'])

export const getFlowDataArray = createSelector(
  [getFlowData],
  (data) => {
    if (data && data.size) {
      // trying to avoid using .toJS(), but not sure if this is any more efficient
      return data.toArray().map(d => d.toObject())
    }
  }
)

export const getHoveredMetric = state =>
  state.getIn(['streams', 'hoveredMetric'])

export const getHoveredMonth = state =>
  state.getIn(['streams', 'hoveredMonth'])

export const getHoveredMonthData = state =>
  state.getIn(['streams', 'hoveredMonthData'])
