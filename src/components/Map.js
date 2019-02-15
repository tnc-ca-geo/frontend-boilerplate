import React from 'react'
import PropTypes from 'prop-types'


class Map extends React.Component {

  componentDidMount() {
    this.props.initMap(this.mapView)
  }


  render() {
    return (
      <div className='map' ref={(ref) => { this.mapView = ref }} />
    );
  }
}


Map.propTypes = {
  initMap: PropTypes.func.isRequired,
}

export default Map
