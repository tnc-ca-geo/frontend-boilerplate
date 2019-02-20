import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../assets/tnc-logo-full-black.svg'
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'


const NavBar = () => (
  <Navbar bg='light' variant='light'>
    <IndexLinkContainer to='/'>
      <Navbar.Brand>
        <img
          alt=''
          src={logo}
          width='110'
          className='d-inline-block align-top'
        />
        {'  Boilerplate'}
      </Navbar.Brand>
    </IndexLinkContainer>
    <Nav className='justify-content-end'>
      <LinkContainer to='/science'>
        <Nav.Link>Science</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/map'>
        <Nav.Link>Map</Nav.Link>
      </LinkContainer>
      <LinkContainer to='/api'>
        <Nav.Link>API</Nav.Link>
      </LinkContainer>
    </Nav>
  </Navbar>
)


export default NavBar
