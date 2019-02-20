import { connect } from 'react-redux'
import { getStreamAttributes } from '../selectors'
import StreamPopup from '../components/StreamPopup'

const mapStateToProps = (state) => ({
  streamAttributes: getStreamAttributes(state)
})

export default connect(mapStateToProps)(StreamPopup)
