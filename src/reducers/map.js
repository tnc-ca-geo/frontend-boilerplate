import { Map, List, fromJS } from 'immutable'


import {
  INIT_MAP,
  LAYER_DID_LOAD,
  SELECTION_CHANGE
} from '../actions/map'

const initialState = Map({
  status: null,
  layerURLs: List(),
  selectedFeature: null
})

export default (state = initialState, action) => {
  switch (action.type) {

    case INIT_MAP:
      return state.set('status', action.status)

    case LAYER_DID_LOAD:
      const layer = Map({
        layerGroup: action.layerGroup,
        url: action.url
      })
      const urls = state.getIn(['layerURLs']).push(layer)
      return state.set('layerURLs', urls)

    case SELECTION_CHANGE:
      const feature = fromJS({
        layerGroup: action.layerGroup,
        feature: action.feature
      })
      console.log('reducing SELECTION_CHANGE: ', feature);
      return state.set('selectedFeature', feature)

    default:
      return state;
  }
}
