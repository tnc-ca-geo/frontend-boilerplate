import { connect } from 'react-redux'
import { getComid } from '../selectors'
import StreamPopup from '../components/StreamPopup'

const mapStateToProps = (state) => ({
  comid: getComid(state)
})

export default connect(mapStateToProps)(StreamPopup)
