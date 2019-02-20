import { connect } from 'react-redux'
import {
  getStreamAttributes,
  getFlowDataArray
 } from '../selectors'
import StreamPopup from '../components/StreamPopup'

const mapStateToProps = (state) => ({
  streamAttributes: getStreamAttributes(state),
  flowData: getFlowDataArray(state)
})

export default connect(mapStateToProps)(StreamPopup)
