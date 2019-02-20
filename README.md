# Frontend boilerplate for map-based web apps

For bootstrapping apps with:
- React as framework
- Redux for state management
- ESRI JS API for mapping
- D3 for charts and visualizations

## Integration details

The boilerplate leverages Redux middleware to encapsulate all interactions with the ESRI JS API. Here's a [blog post](https://www.esri.com/arcgis-blog/products/3d-gis/3d-gis/react-redux-building-modern-web-apps-with-the-arcgis-js-api/) and [sample app](https://github.com/Esri/react-redux-js4) that describes that approach.

The integration with D3 follows the "Lifecycles Method Wrapping" approach outlined [here](https://www.smashingmagazine.com/2018/02/react-d3-ecosystem/).


# Getting started

## install dependencies
```
npm install
```

## start dev server
```
npm start
```

## generate a build
```
npm run build
```
