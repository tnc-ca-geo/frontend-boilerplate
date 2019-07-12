import React from 'react'
import ReactDOM from 'react-dom'
import StreamPopup from '../../containers/StreamPopup'
import { Provider } from 'react-redux'
import { store } from '../../index'

// Not sure this is the cleanest approach
// It feels out of place (is it weird to be rendering new components
// from within middleware? Middleware is where you want to put processes
// that have side effects, so maybe it's ok?)
// Also not sure about exporting the store from index.js
// NOTE: look into race-conditions (two react trees/ components are 'racing' to
// change the same state props at the same time)... Probably not an issue 
// here because this react tree is only updating hoveredMonth and hoveredMetric
// properties (other tree is not touching those props)

const buildPopup = () => {
  console.log('building popup');
  let popupNode = document.createElement('div')
  ReactDOM.render(
    <Provider store={ store }>
      <StreamPopup />
    </Provider>,
    popupNode
  )
  return popupNode
}

export default buildPopup
