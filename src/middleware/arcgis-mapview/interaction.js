import { selectionChange } from '../../actions/map'
// import { getLayerURLs } from '../../selectors'
// TODO: no longer need to store and check slelections against layer URLs,
// so remove from reducer/actions/selectors


const handleClick = (response, view, store) => {

  // TODO: route behavior based on layer group
  let graphic = response.results.filter(result =>
    result.graphic.layer.title === 'streams'
  )

  if (graphic.length) {

    const mapPoint = graphic[0].mapPoint
    const feature = graphic[0].graphic
    const layerGroup = feature.layer.title

    store.dispatch(selectionChange(layerGroup, feature, mapPoint))

  } else {

    store.dispatch(selectionChange(null, null, null))
    // TODO: do I need to destroy the StreamPopup component?

  }

}

export const registerClickEvent = (view, store) =>
  view.on('click', event => {
    view.hitTest(event.screenPoint)
      .then(response => handleClick(response, view, store))
    })


export default registerClickEvent
