import { connect } from 'react-redux'
import { initMap } from '../actions/map'
import Map from '../components/Map'


export default connect(null, { initMap })(Map)
