import React from 'react'
import PropTypes from 'prop-types'


const StreamPopup = ({ streamAttributes, data }) => (
  <div>
    Stream popup for comid: {streamAttributes.comid}
  </div>
)

StreamPopup.propTypes = {
  streamAttributes: PropTypes.object,
  flowData: PropTypes.array
}

export default StreamPopup
