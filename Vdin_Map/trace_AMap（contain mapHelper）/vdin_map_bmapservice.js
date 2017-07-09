var Vdin = Vdin     || {};
Vdin.Map = Vdin.Map || {};

Vdin.Map.BMapService = {

  map: null,

  canvas:       null,
  layer:        null,
  layerService: null,
  opacity:      null,
  zIndex:       null,
  zoomRange:    null,
  zoom:         null,

  initialize: function (options)
  {
    self = Vdin.Map.BMapService;

    if (!options.mapContainer)
    {
      throw "The mapContainer argument is required.";
    }
    if (!options.center)
    {
      throw "The center argument is required.";
    }

    var center       = options.center;
    var center       = options.center;
    var mapContainer = options.mapContainer;
    self.zoom        = options.zoom;
    self.zoomRange   = options.zoomRange;

    self.map = new BMap.Map(
      options.mapContainer,
      {
        minZoom: self.zoomRange[0],
        maxZoom: self.zoomRange[1]
      }
    );

    self.map.centerAndZoom(
      new BMap.Point(center.longitude, center.latitude),
      self.zoom
    );
    self.map.enableScrollWheelZoom = true;

    ComplexCustomOverlay = function (){};

    self.bindMapEvent("addtilelayer");
    self.bindMapEvent("dragging");
    self.bindMapEvent("zoomend");

    return self;
  },

  getBounds: function ()
  {
    self = Vdin.Map.BMapService;

    var bounds    = self.map.getBounds();
    var southWest = bounds.getSouthWest();
    var northEast = bounds.getNorthEast();

    return {
      minLongitude: southWest.lng,
      minLatitude:  southWest.lat,
      maxLatitude:  northEast.lat,
      maxLongitude: northEast.lng
    };
  },

  setLayerService: function(layerService)
  {
    var self = Vdin.Map.BMapService;
    if (!layerService)
    {
      throw "The layerService argument is required.";
    }
    self.layerService = layerService;
  },

  addLayer: function(canvas, zIndex, opacity)
  {
    self = Vdin.Map.BMapService;

    self.zIndex  = zIndex;
    self.opacity = opacity;
    
    ComplexCustomOverlay.prototype = new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize = function(map)
    {
      map.getPanes().labelPane.appendChild(canvas);
      self.layerService.draw();
    };
    ComplexCustomOverlay.prototype.draw = function(){};

    return {
      width:  self.map.getSize().width,
      height: self.map.getSize().height
    };
  },

  redraw: function(target)
  {
    ComplexCustomOverlay.prototype.initialize(target);
  },

  bindMapEvent: function(eventName)
  {
    var self = Vdin.Map.BMapService;

    self.map.addEventListener(
      eventName,
      function(event)
      {
        if(self.layerService.isEnabled())
        {
          self.redraw(this);
        }
      }
    );
  }
};
