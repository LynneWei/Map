Vdin.Map.AMap = {
  map: null,

  canvas:       null,
  layerService: null,
  zIndex:       null,
  zoomRange:    null,

  initialize: function(options)
  {
    var self = Vdin.Map.AMap;

    var center     = options.center || Vdin.Map.Helper.caculateCenterPoint();
    self.opacity   = options.opacity;
    self.zIndex    = options.zIndex;
    self.zoomRange = options.zoomRange;

    self.map = new AMap.Map(
      options.mapContainer,
      {
        zoom:   options.zoom,
        center: center
      }
    );

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
  },

  addLayer: function(canvas)
  {
    var self = Vdin.Map.AMap;
    var layer = null;

    canvas.width      = self.map.getSize().width;
    canvas.height     = self.map.getSize().height;
    canvasWidthHeight = [canvas.width, canvas.height];

    layer = new AMap.CustomLayer(
      canvas,
      {
        zooms:   self.zoomRange,
        zIndex:  self.zIndex,
        opacity: self.opacity
      }
    );
    layer.setMap(self.map);

    return canvasWidthHeight;
  },

  getLongitudeLatitudeValue: function()
  {
    var self = Vdin.Map.AMap;

    var bound        = self.map.getBounds();
    var northEast    = bound.getNorthEast();
    var southWest    = bound.getSouthWest();
    var minLongitude = southWest.getLng();
    var minLatitude  = southWest.getLat();
    var maxLatitude  = northEast.getLat();
    var maxLongitude = northEast.getLng();
    var boundList   = [minLongitude, maxLongitude, minLatitude, maxLatitude];

    return boundList;
  }
}