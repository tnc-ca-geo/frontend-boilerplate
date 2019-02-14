import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Map from '../containers/Map'


const Streams = () => (
  <Container fluid='true'>
    <Row>
      <Col>
        <div className="map-wrapper">
          <Map />
        </div>
      </Col>
    </Row>
  </Container>
)


export default Streams
