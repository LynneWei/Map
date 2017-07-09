Vdin.Map.AMap = {
  map: null,

  canvas:       null,
  layer:        null,
  traceCenter:  null,
  zIndex:       null,
  zoomRange:    null,
  layerService: null,

  initialize: function(options, options2)
  {
    var self = Vdin.Map.AMap;
// console.info("AMap initialize");
    // var t = Vdin.Map.Trace.initialize(null, options2);
    console.info(self);
    self.traceOpacity = options.traceOpacity;
    self.zIndex       = options.zIndex;
    self.zoomRange    = options.zoomRange;
    // console.info(t);
    var center        = Vdin.Map.Trace.caculateCenterPoint(options.center);
    self.map = new AMap.Map(
      options.mapContainer,
      {
        zoom:   options.zoom,
        center: center
      }
    );
    
    console.info("after getCenter");
    self.map.on(
      "dragging",
      function (e)
      {
        self.layerService.context.clearRect(0, 0, self.layerService.canvas.width, self.layerService.canvas.height);
        self.layerService.canvas.width = self.layerService.canvas.width;
        self.layerService.paint();
      }
    );
    self.map.on(
      "zoomchange",
      function (e)
      {
        self.layerService.context.clearRect(0, 0, self.layerService.canvas.width, self.layerService.canvas.height);
        self.layerService.canvas.width = self.layerService.canvas.width;
        self.layerService.paint();
      }
    );
    self.map.on(
      "resize",
      function (e)
      {
        self.layerService.context.clearRect(0, 0, self.layerService.canvas.width, self.layerService.canvas.height);
        self.layerService.canvas.width = self.layerService.canvas.width;
        self.layerService.paint();
      }
    );

    return self;
  },
  setLayerService: function(layerService)
  {
    var self = Vdin.Map.AMap;
    self.layerService = layerService;
    // console.info(self);
  },

  getLongitudeLatitudeValue: function()
  {
    var self = Vdin.Map.AMap;

    var border       = self.map.getBounds();
    var northEast    = border.getNorthEast();
    var southWest    = border.getSouthWest();
    var minLongitude = southWest.getLng();
    var minLatitude  = southWest.getLat();
    var maxLatitude  = northEast.getLat();
    var maxLongitude = northEast.getLng();
    var resultList   = [minLongitude, maxLongitude, minLatitude, maxLatitude];

    return resultList;
  },

  addLayer: function(canvas)
  {
    var self = Vdin.Map.AMap;

    canvas.width      = self.map.getSize().width;
    canvas.height     = self.map.getSize().height;
    canvasWidthHeight = [canvas.width, canvas.height];

    self.layer = new AMap.CustomLayer(
      canvas,
      {
        zooms:   self.zoomRange,
        zIndex:  self.zIndex,
        opacity: self.traceOpacity
      }
    );
    self.layer.setMap(self.map);
    
    return canvasWidthHeight;
  }
}