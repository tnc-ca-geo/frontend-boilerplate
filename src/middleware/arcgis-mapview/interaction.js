import { selectionChange } from '../../actions/map';
import { getLayerURLs } from '../../selectors'


const findLayerGroup = (selectedFeature, state) => {
  const selectedURL = selectedFeature.sourceLayer.url
  const layerURLs = getLayerURLs(state)
  let layer = layerURLs.filter(url => url.get('url') === selectedURL)
  return layer.get(0).get('layerGroup')
}

const registerSelectionWatcher = (view, store) =>
  view.popup.watch('selectedFeature', newValue => {

    if (!newValue || !newValue.sourceLayer) {
      store.dispatch(selectionChange(null, null))
      return
    }

    const layerGroup = findLayerGroup(newValue, store.getState())
    store.dispatch(selectionChange(layerGroup, newValue))

  })


export default registerSelectionWatcher
