Vdin.Map.BMap = {
  map: null,

  canvas:       null,
  layer:        null,
  layerService: null,
  zIndex:       null,
  zoomRange:    null,
  zoom:         null,

  initialize: function (options)
  {
    self = Vdin.Map.BMap;

    var center        = options.center || Vdin.Map.Helper.caculateCenterPoint();
    self.traceOpacity = options.traceOpacity;
    self.zIndex       = options.zIndex;
    self.zoomRange    = options.zoomRange;
    self.zoom         = options.zoom;

    self.map = new BMap.Map(options.mapContainer,{minZoom:self.zoomRange[0],maxZoom:self.zoomRange[1]});
    self.map.centerAndZoom(new BMap.Point(center[0], center[1]), self.zoom);
    self.map.enableScrollWheelZoom = true;

    ComplexCustomOverlay = function (){};

    self.map.addEventListener("addtilelayer", function(){  
      ComplexCustomOverlay.prototype.initialize(this);    
    });
    self.map.addEventListener("dragging", function(){    
      ComplexCustomOverlay.prototype.initialize(this);    
    });
    self.map.addEventListener("zoomend", function(){  
      ComplexCustomOverlay.prototype.initialize(this);    
    });

    return self;
  },

  getLongitudeLatitudeValue: function ()
  {
    self = Vdin.Map.BMap;

    var bound        = self.map.getBounds();
    var southWest    = bound.getSouthWest();
    var northEast    = bound.getNorthEast();
    var minLongitude = southWest.lng;
    var minLatitude  = southWest.lat;
    var maxLatitude  = northEast.lat;
    var maxLongitude = northEast.lng;
    var boundList    = [minLongitude, maxLongitude, minLatitude, maxLatitude];

    return boundList;
  },

  setLayerService: function(layerService)
  {
    var self = Vdin.Map.BMap;

    self.layerService = layerService;
  },

  addLayer: function(canvas)
  {
    self = Vdin.Map.BMap;

    canvas.width      = self.map.getSize().width;
    canvas.height     = self.map.getSize().height;
    canvasWidthHeight = [canvas.width, canvas.height];
    
    ComplexCustomOverlay.prototype = new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize = function(map)
    {
      map.getPanes().labelPane.appendChild(canvas);
      self.layerService.paint();
    };
    ComplexCustomOverlay.prototype.draw = function(){};

    return canvasWidthHeight;
  }
}