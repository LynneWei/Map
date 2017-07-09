Vdin     = Vdin     || {};
Vdin.Map = Vdin.Map || {};

Vdin.Map.AMap = {

  map: null,

  canvas:       null,
  layerService: null,
  zoomRange:    null,

  initialize: function(options)
  {
    var self = Vdin.Map.AMap;

    self.zoomRange = options.zoomRange;

    if (options.mapContainer)
    {
      var mapContainer = options.mapContainer;
    }
    else
    {
      throw "The mapContainer argument is required.";
    }

    if (options.center)
    {
      var center = options.center;
    }
    else
    {
      throw "The center argument is required.";
    }

    self.map = new AMap.Map(
      mapContainer,
      {
        zoom:   options.zoom,
        center: center
      }
    );

    self.bindMapEvent("dragging");
    self.bindMapEvent("zoomchange");
    self.bindMapEvent("resize");

    return self;
  },

  setLayerService: function(layerService)
  {
    var self = Vdin.Map.AMap;

    self.layerService = layerService;
  },

  addLayer: function(canvas, zIndex, opacity)
  {
    var self = Vdin.Map.AMap;

    var layer = new AMap.CustomLayer(
      canvas,
      {
        zooms:   self.zoomRange,
        zIndex:  zIndex,
        opacity: opacity
      }
    );
    layer.setMap(self.map);

    var canvasSize = {
      width:  self.map.getSize().width,
      height: self.map.getSize().height
    };

    return canvasSize;
  },

  getBounds: function()
  {
    var self = Vdin.Map.AMap;

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

  repaint: function()
  {
    var self = Vdin.Map.AMap; 

    self.layerService.context.clearRect(0, 0, self.layerService.canvas.width, self.layerService.canvas.height);
    //self.layerService.canvas.width = self.layerService.canvas.width;

    self.layerService.paint();
  },

  bindMapEvent: function(eventName)
  {
    var self = Vdin.Map.AMap;

    self.map.on(
      eventName,
      function(event)
      {
        self.repaint();
      }
    );
  }
};
