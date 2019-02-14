import '@babel/polyfill';
import './config';

/*
import FeatureLayer from 'esri/layers/FeatureLayer';
import WebMap from 'esri/WebMap';

import React from 'react';
import ReactDOM from 'react-dom';

import { Header } from './components/header';
import { WebMapComponent } from './components/webmapview';

import './css/main.scss';

const addDOMNode = () => {
  const appNode = document.createElement('div');
  appNode.id = 'app';
  document.body.appendChild(appNode);
  return appNode;
}

const onComponentLoad = (view) => {
  featureLayer.when(() => {
    view.goTo({ target: featureLayer.fullExtent });
  });
};

const featureLayer = new FeatureLayer({
  id: 'states',
  portalItem: {
    id: 'b234a118ab6b4c91908a1cf677941702'
  },
  outFields: ['NAME', 'STATE_NAME', 'VACANT', 'HSE_UNITS'],
  title: 'U.S. counties'
});

const webmap = new WebMap({
  portalItem: {
    id: '3ff64504498c4e9581a7a754412b6a9e'
  },
  layers: [featureLayer]
});


ReactDOM.render(
  <div className='main'>
    <Header appName='Webpack App'/>
    <WebMapComponent
      webmap={webmap}
      onload={onComponentLoad} />
  </div>,
  addDOMNode()
);

*/

import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import './css/main.scss'    // should this be .css instead?
import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/css/bootstrap-theme.css'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'
import App from './App'
import rootReducer from './reducers'
import history from './history'
import configureStore from './configureStore'

const store = configureStore()


const render = () => ReactDOM.render(
  <AppContainer>
    <Provider store={ store }>
      <App history={ history } />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
)


render()

// Hot reloading
// allows for updating components while maintaining state
// https://github.com/supasate/connected-react-router/blob/e444615c281bcb4d518636bee2666d1e9357bf8e/examples/basic/src/index.js
if (module.hot) {
  // Reload components
  module.hot.accept('./App', () => {
    render()
  })
  // Reload reducers
  module.hot.accept('./reducers', () => {
    store.replaceReducer(rootReducer(history))
  })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
