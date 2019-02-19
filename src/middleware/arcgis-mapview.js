import { mapDefaults } from '../config/map'
import Map from 'esri/Map'
import MapView from 'esri/views/MapView'

import {
  INIT_MAP,
} from '../actions/map'

import requestLayer from './arcgis-mapview/requestLayers'
import registerClickEvent from './arcgis-mapview/interaction'
// import { updateHighlights } from './arcgis-sceneview/highlights';
// import { setEnvironment } from './arcgis-sceneview/environment';


const arcgis = {};
window.arcgis = arcgis;

const arcgisMiddleWare = store => next => (action) => {
  switch (action.type) {

    case INIT_MAP:
      if (!action.container) break

      // if mapview container is already initialized
      // just add it back to the DOM.
      if (arcgis.container) {
        action.container.appendChild(arcgis.container)
        break;
      }

      // Otherwise, create a new container element and a new map view.
      arcgis.container = document.createElement('div')
      action.container.appendChild(arcgis.container)
      arcgis.mapView = new MapView({
        container: arcgis.container,
        center: mapDefaults.center,
        zoom: mapDefaults.zoom
      })

      // Register selected feature watcher on popup
      registerClickEvent(arcgis.mapView, store)

      const map = new Map({
        basemap: mapDefaults.primaryBasemap,
        layers: [
          // TODO: consolodate into one function that takes array of layer names
          // i.e. requestLayers(['watersheds', 'streams', 'gages'], store)
          requestLayer('watersheds', store),
          requestLayer('streams', store),
          requestLayer('gages', store),
        ]
       })

      arcgis.mapView.map = map


      return arcgis.mapView
        .when(() => {
          // arcgis.mapView.layers.items.forEach((layer) => { layer.popupEnabled = false })

          arcgis.mapView.popup.autoOpenEnabled = false

          next({ ...action, status: 'loaded' })

          // return arcgis.sceneView.whenLayerView(webScene.layers.getItemAt(0));
        })
        .then(() => {
          // // Update the environment settings (either from the state or from the scene)
          // const webSceneEnvironment = arcgis.sceneView.map.initialViewProperties.environment;
          // const date = new Date(webSceneEnvironment.lighting.date);
          // date.setUTCHours(date.getUTCHours() + webSceneEnvironment.lighting.displayUTCOffset);
          //
          // const { environment } = store.getState();
          //
          // store.dispatch({
          //   type: SET_ENVIRONMENT,
          //   date: environment.date !== null ? environment.date : date,
          //   UTCOffset: webSceneEnvironment.lighting.displayUTCOffset,
          //   shadows: environment.shadows !== null ?
          //     environment.shadows :
          //     webSceneEnvironment.lighting.directShadowsEnabled,
          // });
          //
          // // Update the selection highlights
          // const { selection } = store.getState();
          // updateHighlights(arcgis.sceneView, selection);
        });

      default: {
        next(action)
        break
      }

    }

  return Promise.resolve()

};


export default arcgisMiddleWare;