import React from 'react'
import ReactDOM from 'react-dom'
import StreamPopup from '../../components/StreamPopup'
import { selectionChange } from '../../actions/map';
// import { getLayerURLs } from '../../selectors'

// TODO: no longer need to store and check slelections against layer URLs,
// so remove from reducer/actions/selectors


const addPopup = () => {
  let popupNode = document.createElement('div')
  ReactDOM.render(<StreamPopup />, popupNode)
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

  }

}

export const registerClickEvent = (view, store) =>
  view.on('click', event => {
    view.hitTest(event.screenPoint)
      .then(response => handleClick(response, view, store))
    })


export default registerClickEvent
