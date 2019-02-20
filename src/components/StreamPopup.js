import React from 'react'
import PropTypes from 'prop-types'


const StreamPopup = ({ streamAttributes }) => (
  <div>
    Stream popup for comid: {streamAttributes.comid}
  </div>
)

StreamPopup.propTypes = {
  streamAttributes: PropTypes.object
}

export default StreamPopup
