Vdin     = Vdin     || {};
Vdin.Map = Vdin.Map || {};

Vdin.Map.BMap = {

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
    self = Vdin.Map.BMap;

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

    var center     = options.center;
    self.zoom      = options.zoom;
    self.zoomRange = options.zoomRange;

    self.map = new BMap.Map(
      options.mapContainer,
      {
        minZoom: self.zoomRange[0],
        maxZoom: self.zoomRange[1]
      }
    );

    self.map.centerAndZoom(
      new BMap.Point(center[0], center[1]),
      self.zoom
    );
    self.map.enableScrollWheelZoom = true;

    ComplexCustomOverlay = function (){};

    self.eventOption("addtilelayer");
    self.eventOption("dragging");
    self.eventOption("zoomend");

    return self;
  },

  getBounds: function ()
  {
    self = Vdin.Map.BMap;

    var bounds    = self.map.getBounds();
    var southWest = bounds.getSouthWest();
    var northEast = bounds.getNorthEast();

    var boundsList = {
      minLongitude: southWest.lng,
      minLatitude:  southWest.lat,
      maxLatitude:  northEast.lat,
      maxLongitude: northEast.lng
    }

    return boundsList;
  },

  setLayerService: function(layerService)
  {
    var self = Vdin.Map.BMap;

    self.layerService = layerService;
  },

  addLayer: function(canvas, zIndex, opacity)
  {
    self = Vdin.Map.BMap;

    self.zIndex  = zIndex;
    self.opacity = opacity;
    
    ComplexCustomOverlay.prototype = new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize = function(map)
    {
      map.getPanes().labelPane.appendChild(canvas);
      self.layerService.paint();
    };
    ComplexCustomOverlay.prototype.draw = function(){};

    var canvasSize = {
      width:  self.map.getSize().width,
      height: self.map.getSize().height
    }
    return canvasSize;
  },

  repaint: function(target)
  {
    ComplexCustomOverlay.prototype.initialize(target);
  },

  eventOption: function(event)
  {
    var self = Vdin.Map.BMap;

    self.map.addEventListener(
      event,
      function()
      { 
        self.repaint(this);  
      }
    );
  }
};
