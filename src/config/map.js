const AGO_ROOT = 'https://services.arcgis.com/' +
  'F7DSX1DSNSiWmOqh/ArcGIS/rest/services/'

const STREAMS_POPUP = {
  title: 'COMID: {comid}',
  content:
  '<div class="meta-data">' +
    '<p class="stream-name">{gnis_name}</p>' +
    '<div class="focus-metrics">' +
      '<div class="metric-display line">' +
        '<div class="variable observed">' +
          '<div class="variable-label">Observed Flow</div>' +
          '<div class="metrics">' +
            '<div class="metric all-years">' +
              '<div class="label"><div class="dot"></div><span class="range"></span></div>' +
              '<div>' +
                '<span class="focus-data"></span>' +
                '<span class="units" style="display: none">CFS</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="variable estimated">' +
          '<div class="variable-label">Estimated Natural Flow</div>' +
          '<div class="metrics">' +
            '<div class="metric lower-quarter">' +
              '<div class="label"><div class="dot"></div>Dry Years</div>' +
              '<div>' +
                '<span class="focus-data"></span>' +
                '<span class="units" style="display: none">CFS</span>' +
              '</div>' +
            '</div>' +
            '<div class="metric all-years">' +
              '<div class="label"><div class="dot"></div>All Years</div>' +
              '<div>' +
                '<span class="focus-data"></span>' +
                '<span class="units" style="display: none">CFS</span>' +
              '</div>' +
            '</div>' +
            '<div class="metric upper-quarter">' +
              '<div class="label"><div class="dot"></div>Wet Years</div>' +
              '<div>' +
                '<span class="focus-data"></span>' +
                '<span class="units" style="display: none">CFS</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="metric-display raster hidden">' +
        '<div class="variable estimated">' +
          '<div class="variable-label">Estimated</div>' +
          '<div class="metrics">' +
            '<div class="metric raster">' +
              '<div class="label">' +
                '<div class="dot" style="display: none"></div>' +
                '<div class="date">Hover chart to see flow data</div>' +
              '</div>' +
              '<div>' +
                '<span class="focus-data"></span>' +
                '<span class="units" style="display: none">CFS</span>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>' +
  '<div class="flow-interface-chart line">' +
    '<svg id="lineChart" width="550" height="200" class="line"></svg>' +
  '</div>' +
  '<div class="flow-interface-chart raster hidden">' +
    '<svg id="rasterChart" width="550" height="200" class="raster"></svg>' +
  '</div>' +
  '<div class="popup-footer">' +
    '<div class="popup-actions">' +
      '<div class="queue-controls {comid:isComidQueued}">' +
        '<div role="button" class="action-button" title="Add Stream to Queue" data-action="add-stream-to-queue" onclick="handleActionClick(this.dataset.action, {comid})">' +
          '<span class="icon esri-icon-plus-circled"></span><span class="button-text">Add Stream to Queue</span>' +
        '</div>' +
        '<div role="button" class="action-button" title="Remove Stream from Queue" data-action="remove-stream-from-queue" onclick="handleActionClick(this.dataset.action, {comid})">' +
          '<span class="icon esri-icon-minus-circled"></span><span class="button-text">Remove Stream from Queue</span>' +
        '</div>' +
      '</div>' +
      '<div role="button" class="action-button" title="Toggle Chart Type" data-action="toggle-chart-type" onclick="handleActionClick(this.dataset.action, {comid})">' +
        '<span class="icon esri-icon-chart"></span><span class="button-text">Toggle Chart Type</span>' +
      '</div>' +
    '</div>' +
    '<div class="confidence-interval-key">' +
      '<svg height="17" width="17" class="pattern-swatch">' +
        '<rect style="fill: url(#circles-1) #000;" x="0" y="0" height="17" width="17"></rect>' +
      '</svg>' +
      '<span class="label">80% Confidence Interval</span>' +
    '</div>' +
  '</div>',
}

const WATERSHED_POPUP = {
  title: 'Watershed: {name}',
  content: '<ul style="display: none">' +
    '<li><strong>HUC_10: </strong> {huc}</li>' +
    '<li id="segmentCount"></li></ul>',
}

const GAGE_POPUP = {
  title: 'Gage: {name}',
  content:
    '<p class=\'{expression/check-reference}\'>The flow data from this ' +
    'gage was relatively unimpaired from human dams and diversions ' +
    'between <strong>{ref_begin}</strong> and ' +
    '<strong>{ref_end}</strong>. It was used as reference data to ' +
    'train the natural flow model.</p>' +
    '<a href=\'{expression/usgs-link}\' target="_blank">View gage data</a>',
  expressionInfos: [
    {
      name: 'check-reference',
      expression: "if($feature.final_ref == 'N'){ return 'invisible'; }"
    },
    {
      name: 'get-start-date',
      expression:
        "if($feature.ref_begin == 0){ return 1950; } " +
        "else { return $feature.ref_begin; }"
    },
    {
      name: 'get-end-date',
      expression:
        "if($feature.ref_end == 0){ return 2015; } " +
        "else { return $feature.ref_end; }"
    },
    {
      name: 'usgs-link',
      expression:
        "var count = Count($feature.id);" +
        "var id = Right($feature.id, count - 1);" +
        "return 'https://waterdata.usgs.gov/nwis/inventory/?site_no=' + id"
    }
  ]
}


export default const mapConfig {

  layers: {

    //--------------------------------------------------------------------------
    //  Streams
    //--------------------------------------------------------------------------

    streams: {

      sublayers: [
        {
          id: '01',
          url: AGO_ROOT + 'nhdv2_display_1/FeatureServer',
          type: 'featureLayer',
          visible: true,
          opacity: 1,
          outFields: ['*'],
          popupTemplate: STREAMS_POPUP,
        },
        {
          id: '02',
          url: AGO_ROOT + 'nhdv2_display_2/FeatureServer',
          type: 'featureLayer',
          visible: true,
          opacity: 1,
          outFields: ['*'],
          popupTemplate: STREAMS_POPUP,
        },
        {
          id: '03',
          url: AGO_ROOT + 'nhdv2_display_3/FeatureServer',
          type: 'featureLayer',
          visible: true,
          opacity: 1,
          outFields: ['*'],
          popupTemplate: STREAMS_POPUP,
        },
        {
          id: '04',
          url: AGO_ROOT + 'nhdv2_display_4/FeatureServer',
          type: 'featureLayer',
          visible: true,
          opacity: 1,
          outFields: ['*'],
          popupTemplate: STREAMS_POPUP,
        },
      ],

      groupLayer: {
        id: '99',
      	title: 'Streams',
        order: 1,
      	visible: true,
      	visibilityMode: 'inherited',
      	opacity: 1,
      },

      searchConfig: {
        url: AGO_ROOT + 'nhdv2_display_4/FeatureServer',
        searchFields: ['comid', 'gnis_name'],
        exactMatch: true,
        outFields: ['*'],
        name: 'Stream segments',
        placeholder: 'Search COMID or GNIS Name',
        suggestionTemplate: 'COMID: {comid} ({gnis_name})',
        popupTemplate: STREAMS_POPUP,
      },

    },

    //--------------------------------------------------------------------------
    //  Watersheds
    //--------------------------------------------------------------------------

    watersheds: {

      sublayers: [
        {
          id: '05',
          url: AGO_ROOT + 'hucs_12_ca/FeatureServer',
          type: 'featureLayer',
          visible: false,
          opacity: 1,
          outFields: ['*'],
          popupEnabled: false,
          popupTemplate: {
            title: 'Subwatershed: {name}',
            content: '<ul style="display: none">' +
              '<li><strong>HUC_12: </strong> {huc}</li>' +
              '<li id="segmentCount"></li></ul>',
          },
        },

        {
          id: '06',
          url: AGO_ROOT + 'hucs_10_ca/FeatureServer',
          type: 'featureLayer',
          visible: true,
          opacity: 1,
          outFields: ['*'],
          popupTemplate: WATERSHED_POPUP,
        },

        {
          id: '07',
          url: AGO_ROOT + 'hucs_8_ca/FeatureServer',
          type: 'featureLayer',
          visible: false,
          opacity: 1,
          outFields: ['*'],
          popupTemplate: {
            title: 'Subbasin: {name}',
            content: '<ul style="display: none">' +
              '<li><strong>HUC_08: </strong> {huc}</li>' +
              '<li id="segmentCount"></li></ul>',
          },
        },
      ],

      groupLayer: {
        id: '98',
      	title: 'Watersheds',
        order: 2,
      	visible: false,
      	visibilityMode: 'independent',
      	opacity: 1,
      },

      searchConfig: {
        url: AGO_ROOT + 'hucs_10_ca/FeatureServer',
        searchFields: ['name'],
        exactMatch: true,
        outFields: ['*'],
        name: 'Watersheds',
        placeholder: 'Search watersheds',
        suggestionTemplate: '{name}',
        popupTemplate: WATERSHED_POPUP,
      },

    },

    //--------------------------------------------------------------------------
    //  Gages
    //--------------------------------------------------------------------------

    gages: {

      id: '07',
      title: 'Gages',
      url: AGO_ROOT + 'gauges/FeatureServer',
      visibile: true,
      opacity: 1,
      outFields: ['*'],
      popupTemplate: GAGE_POPUP,
      searchConfig: {
        url: AGO_ROOT + 'gauges/FeatureServer',
        searchFields: ['name'],
        exactMatch: true,
        outFields: ['*'],
        name: 'Gages',
        placeholder: 'Search for Gages',
        suggestionTemplate: 'Gage: {name}',
        popupTemplate: GAGE_POPUP,
      },
    },

  },

  defaults: {
    primaryBasemap: 'topo-vector',
    secondaryBasemap: 'satellite',
    center: [-121, 38],
    zoom: 7,
    camera: {
      position: { // autocasts as new Point()
        x: -120.3405266104523,
        y: 37.570069924445725,
        z: 20160.882327826694,
      },
      heading: 0.748516866949802,
      tilt: 62.95536300536367,
    },
    elevationExageration: 3,
    constraints: {
      rotationEnabled: false
    },
    popupOptions: {
      actions: [],
      dockEnabled: false,
      collapseEnabled: false,
      featureNavigationEnabled: false,
      dockOptions: {
        buttonEnabled: false,
        breakpoint: false,
        position: 'bottom-center',
      },
    }
  },

  additionalServices: {
    printService: 'http://nyadkspatial.tnc.org/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task',
    naturalFlowsAPIv2: 'https://flow-api.codefornature.org/v2/stream/',
  },

  gaTrackingId: 'UA-30758726-19',

}
