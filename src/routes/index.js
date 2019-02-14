import React from 'react'
import { Route, Switch } from 'react-router'
import NavBar from '../components/NavBar'
import Home from '../components/Home'
import ScienceView from '../components/ScienceView'
import MapView from '../components/MapView'
import ApiView from '../components/ApiView'


const routes = (
  <div>
    <NavBar />
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/science" component={ ScienceView } />
      <Route path="/map" component={ MapView } />
      <Route path="/api" component={ ApiView } />
    </Switch>
  </div>
)


export default routes
