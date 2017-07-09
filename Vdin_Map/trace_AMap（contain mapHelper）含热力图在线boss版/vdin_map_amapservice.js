var Vdin = Vdin     || {};
Vdin.Map = Vdin.Map || {};

Vdin.Map.AMapService = {

  map: null,

  canvas:       null,
  layerService: null,
  zoomRange:    null,
  radius:       null,
  opacityRange: null,

  initialize: function(options)
  {
    var self = Vdin.Map.AMapService;

    if (!options.mapContainer)
    {
      throw "The mapContainer argument is required.";
    }
    if (!options.center)
    {
      throw "The center argument is required.";
    }

    self.zoomRange   = options.zoomRange;
    var mapContainer = options.mapContainer;

    self.map = new AMap.Map(
      mapContainer,
      {
        zoom:   options.zoom,
        center: [options.center.longitude, options.center.latitude]
      }
    );

    self.bindMapEvent("dragging");
    self.bindMapEvent("zoomchange");
    self.bindMapEvent("resize");
    
    return self;
  },

  addHeat: function(points, radius, opacityRange)
  {
    var self = Vdin.Map.AMapService;
    var heatmap;
    self.map.plugin(["AMap.Heatmap"], function() {

        heatmap = new AMap.Heatmap(self.map, {
          radius:  radius,
          opacity: opacityRange
        });

        heatmap.setDataSet({
            data: points,
            max: 100
        });
    });
  },

  setLayerService: function(layerService)
  {
    var self = Vdin.Map.AMapService;

    if (!layerService)
    {
      throw "The layerService argument is required.";
    }
    self.layerService = layerService;
  },

  addLayer: function(canvas, zIndex, opacity)
  {
    var self = Vdin.Map.AMapService;

    var layer = new AMap.CustomLayer(
      canvas,
      {
        zooms:   self.zoomRange,
        zIndex:  zIndex,
        opacity: opacity
      }
    );
    layer.setMap(self.map); 

    return {
      width:  self.map.getSize().width,
      height: self.map.getSize().height
    };
  },

  getBounds: function()
  {
    var self = Vdin.Map.AMapService;

    var bounds    = self.map.getBounds();
    var northEast = bounds.getNorthEast();
    var southWest = bounds.getSouthWest();

    return {
      minLongitude: southWest.getLng(),
      minLatitude:  southWest.getLat(),
      maxLongitude: northEast.getLng(),
      maxLatitude:  northEast.getLat()
    };
  },

  redraw: function()
  {
    var self = Vdin.Map.AMapService; 

    self.layerService.clearRect();
    self.layerService.draw();
  },

  bindMapEvent: function(eventName)
  {
    var self = Vdin.Map.AMapService;

    self.map.on(
      eventName,
      function(event)
      {
        if(self.layerService.isEnabled())
        {
          self.redraw();
        }
      }
    );
  }
};
