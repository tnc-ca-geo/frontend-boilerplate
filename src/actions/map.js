export const INIT_MAP = 'INIT_MAP'
export function initMap(container) {
  return {
    type: INIT_MAP,
    container,
    status,
  }
}

export const SELECTION_CHANGE = 'SELECTION_CHANGE'
export function selectionChange(layer, feature) {
  return {
    type: SELECTION_CHANGE,
    layer,
    feature,
  }
}
