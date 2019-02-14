import esriConfig from 'esri/config'
import Map from 'esri/Map'
import MapView from 'esri/views/MapView'


import {
  INIT_MAP,
} from '../actions/map'

// import { registerClickEvent } from './arcgis-mapview/interaction';
// import { updateHighlights } from './arcgis-sceneview/highlights';
// import { setEnvironment } from './arcgis-sceneview/environment';


const arcgis = {};

window.arcgis = arcgis;

/**
 * Middleware function with the signature
 *
 * storeInstance =>
 * functionToCallWithAnActionThatWillSendItToTheNextMiddleware =>
 * actionThatDispatchWasCalledWith =>
 * valueToUseAsTheReturnValueOfTheDispatchCall
 *
 * Typically written as
 *
 * store => next => action => result
 */
const arcgisMiddleWare = store => next => (action) => {
  switch (action.type) {
    /**
     * Initialize map view on a viewport container.
     */
    case INIT_MAP:
      if (!action.container) break

      // if mapview container is already initialized, just add it back to the DOM.
      if (arcgis.container) {
        action.container.appendChild(arcgis.container)
        break;
      }

      // Otherwise, create a new container element and a new map view.
      arcgis.container = document.createElement('DIV')
      action.container.appendChild(arcgis.container)
      arcgis.mapView = new MapView({ container: arcgis.container })

      // registerClickEvent(arcgis.mapView, store);

      // Initialize Map
      // const webScene = new WebScene({ portalItem: { id: action.id } });
      const map = new Map({ basemap: 'topo-vector'})
      arcgis.mapView.map = map

      // When initialized...
      return arcgis.mapView
        .when(() => {
          arcgis.mapView.layers.items.forEach((layer) => { layer.popupEnabled = false })

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

    }

  return Promise.resolve()

};


export default arcgisMiddleWare;
