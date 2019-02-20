import React from 'react'
import ReactDOM from 'react-dom'
import StreamPopup from '../../containers/StreamPopup'
import { selectionChange } from '../../actions/map'
import { Provider } from 'react-redux'
import { store } from '../../index'
// import { getLayerURLs } from '../../selectors'
// TODO: no longer need to store and check slelections against layer URLs,
// so remove from reducer/actions/selectors

// Not sure this is the cleanest approach. Feels hacky...
const addPopup = () => {
  let popupNode = document.createElement('div')
  ReactDOM.render(
    <Provider store={ store }>
      <StreamPopup />
    </Provider>,
    popupNode
  )
  return popupNode
}

const handleClick = (response, view, store) => {

  // TODO: create map that routes behavior based on layer group
  let graphic = response.results.filter(result =>
    result.graphic.layer.title === 'streams'
  )

  if (graphic.length) {

    const feature = graphic[0].graphic
    const layerGroup = feature.layer.title
    store.dispatch(selectionChange(layerGroup, feature))

    view.popup.open({
      title: 'Stream',
      location: graphic[0].mapPoint,
      content: addPopup()
    })

  } else {

    store.dispatch(selectionChange(null, null))
    view.popup.close()
    // TODO: do I need to destroy the StreamPopup component?

  }

}

export const registerClickEvent = (view, store) =>
  view.on('click', event => {
    view.hitTest(event.screenPoint)
      .then(response => handleClick(response, view, store))
    })


export default registerClickEvent
