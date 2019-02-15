import {
  selectionChange
} from '../../actions/map';





const registerSelectionWatcher = (view, store) =>
  view.popup.watch('selectedFeature', newValue => {
    console.log('selected feature changed: ', newValue);

    if (!newValue || !newValue.sourceLayer) {
      store.dispatch(selectionChange(null, null))
      return
    }

    // const layer = findLayer(newValue)
    const layer = 'TODO - FIND LAYER'

    store.dispatch(selectionChange(layer, newValue))

  })


export default registerSelectionWatcher
