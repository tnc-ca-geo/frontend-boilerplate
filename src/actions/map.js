export const INIT_MAP = 'INIT_MAP'
export function initMap(container) {
  return {
    type: INIT_MAP,
    container,
    status,
  }
}

export const LAYER_DID_LOAD = 'LAYER_DID_LOAD'
export function layerDidLoad(layer) {
  return {
    type: LAYER_DID_LOAD,
    layerGroup: layer.title,
    url: layer.url,
  }
}

export const SELECTION_CHANGE = 'SELECTION_CHANGE'
export function selectionChange(layerGroup, feature) {
  return {
    type: SELECTION_CHANGE,
    layerGroup,
    feature,
  }
}
