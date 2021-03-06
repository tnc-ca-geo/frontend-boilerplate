import { layerConfig } from '../../config/map'
import FeatureLayer from 'esri/layers/FeatureLayer'
// import MapImageLayer from 'esri/layers/MapImageLayer'
import GroupLayer from 'esri/layers/GroupLayer'
import { layerDidLoad } from '../../actions/map'

// TODO: allow for fetching other layer types (MapImageLayer, etc)

const requestFeatureLayer = (layerGroup, layerConfig, store) => {
  const newLayer = new FeatureLayer({
    url: layerConfig.url,
    title: layerGroup,
    visible: layerConfig.visible,
    opacity: layerConfig.opacity,
    outFields: layerConfig.outFields,
    popupTemplate: layerConfig.popupTemplate,
  })

  newLayer.when(function(result) {
    // TODO: reiplment display levels for goTo search functionality.
    // if (layerGroup === 'streams') {
    //   app.displayLevels[index + 1] = result.minScale;
    // };
    store.dispatch(layerDidLoad(result))

  }, function(error) {
    console.log('Error loading ' + layerGroup + ' layers')
  })

  return newLayer
}


const requestLayer = (layerGroup, store) => {

  const config = layerConfig[layerGroup]

  if (!config.sublayers) {
    return requestFeatureLayer(layerGroup, config, store)
  }

  const sublayers = config.sublayers.map(function(sublayer, index) {
    return requestFeatureLayer(layerGroup, sublayer, store)
  })

  const groupLayer = new GroupLayer({
    title: config.groupLayer.title,
  	visible: config.groupLayer.visible,
  	visibilityMode: config.groupLayer.visibilityMode,
  	opacity: config.groupLayer.opacity,
    layers: sublayers,
  })

  return groupLayer

}


const requestLayers = (layerGroups, store) => {
  return layerGroups.map(layerGroup => requestLayer(layerGroup, store))
}

export default requestLayers
