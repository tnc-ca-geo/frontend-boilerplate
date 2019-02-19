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

export const getComid = createSelector(
  [getSelectedFeature],
  (feature) => {
    console.log('getting comid');
    if (feature.layerGroup === 'streams') {
      console.log('feature: ', feature)
      return feature
    }
  }
)
