import React from 'react'
import PropTypes from 'prop-types'
import LineHydrograph from '../containers/LineHydrograph'


const StreamPopup = ({ streamAttributes, data }) => (
  <LineHydrograph
    config={{
      height: 200,
      width: 550,
      margins: { top: 20, right: 20, bottom: 30, left: 40 },
    }}
  />
)

StreamPopup.propTypes = {
  streamAttributes: PropTypes.object,
  flowData: PropTypes.array
}

export default StreamPopup
