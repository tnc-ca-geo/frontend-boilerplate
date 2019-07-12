import { mapDefaults } from '../config/map'
import Map from 'esri/Map'
import MapView from 'esri/views/MapView'
import {
  INIT_MAP,
  SELECTION_CHANGE
} from '../actions/map'
import { fetchFlowData } from '../actions/streams'
import requestLayers from './arcgis-mapview/requestLayers'
import registerClickEvent from './arcgis-mapview/interaction'
import buildPopup from './arcgis-mapview/popup'


const arcgis = {}
window.arcgis = arcgis


const arcgisMiddleWare = store => next => (action) => {
  switch (action.type) {

    case INIT_MAP:
      if (!action.container) break

      // if mapview container is already initialized
      // just add it back to the DOM.
      if (arcgis.container) {
        action.container.appendChild(arcgis.container)
        break
      }

      // Otherwise, create a new container element and a new map view.
      arcgis.container = document.createElement('div')
      action.container.appendChild(arcgis.container)
      arcgis.mapView = new MapView({
        container: arcgis.container,
        center: mapDefaults.center,
        zoom: mapDefaults.zoom
      })

      registerClickEvent(arcgis.mapView, store)

      const map = new Map({
        basemap: mapDefaults.primaryBasemap,
        layers: requestLayers(['watersheds', 'streams', 'gages'], store)
       })

      arcgis.mapView.map = map

      return arcgis.mapView
        .when(() => {
          arcgis.mapView.popup.autoOpenEnabled = false
          next({ ...action, status: 'loaded' })
        })


    case SELECTION_CHANGE:
      next(action)

      if (!action.feature) {
        arcgis.mapView.popup.close()
        break
      }

      const comid = action.feature.attributes.comid
      store.dispatch(fetchFlowData({ comids: comid }))
      arcgis.mapView.popup.open({
        title: 'COMID: ' + comid,
        location: action.mapPoint,
        content: buildPopup(),
        actions: []
      })


    default:
      next(action)
      break

    }

  return Promise.resolve()

};


export default arcgisMiddleWare
