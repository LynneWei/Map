Vdin.Map.BMap = {
  map:          null,
  // canvas:       null,
  // // lineArray:    null,
  // traceColor:   null,
  // strokeWeight: null,
  // layerService: null,
  canvas:       null,
  layer:        null,
  traceCenter:  null,
  zIndex:       null,
  zoomRange:    null,
  layerService: null,
  zoom:         null,

  initialize: function (options)
  {
    self = Vdin.Map.BMap;

    self.traceOpacity = options.traceOpacity;
    self.zIndex       = options.zIndex;
    self.zoomRange    = options.zoomRange;
    self.zoom         = options.zoom;
    self.map = new BMap.Map(options.mapContainer,{minZoom:self.zoomRange[0],maxZoom:self.zoomRange[1]});
    // alert(self.zoomRange[0]);
    var center        = Vdin.Map.Trace.caculateCenterPoint(options.center);
    self.map.centerAndZoom(new BMap.Point(center[0], center[1]), self.zoom);
    self.map.enableScrollWheelZoom = true;

    // self.canvas        = document.createElement('canvas');
    // self.canvas.width  = self.map.getSize().width;
    // self.canvas.height = self.map.getSize().height;
    // self.lineArray     = options.lineArray;
    // self.traceColor    = options.traceColor;
    // self.strokeWeight  = options.strokeWeight;


    return self;
  },

  getLongitudeLatitudeValue: function ()
  {
    self = Vdin.Map.BMap;

    var border       = self.map.getBounds();
    var southWest    = border.getSouthWest();
    var northEast    = border.getNorthEast();
    var minLongitude = southWest.lng;
    var minLatitude  = southWest.lat;
    var maxLatitude  = northEast.lat;
    var maxLongitude = northEast.lng;
    var resultList   = [minLongitude, maxLongitude, minLatitude, maxLatitude];

    return resultList;
  },

  setLayerService: function(layerService)
  {
    var self = Vdin.Map.BMap;
    self.layerService = layerService;
    console.info(self);
  },

  addLayer: function(canvas)
  {
    self = Vdin.Map.BMap;
    console.info("success addLayer");
    canvas.width      = self.map.getSize().width;
    canvas.height     = self.map.getSize().height;
    canvasWidthHeight = [canvas.width, canvas.height];
    ComplexCustomOverlay                      = function (){};
    ComplexCustomOverlay.prototype            = new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize = function(map)
    {
      self = Vdin.Map.BMap;

      var resultList   = self.getLongitudeLatitudeValue();
      var minLongitude = resultList[0];
      var maxLongitude = resultList[1];
      var minLatitude  = resultList[2];
      var maxLatitude  = resultList[3];

      canvas = self.layerService.paint();
      self.map.getPanes().labelPane.appendChild(canvas);
      return canvas;
    };
    ComplexCustomOverlay.prototype.draw = function(){};

    var myCompOverlay = new ComplexCustomOverlay();
    self.map.addOverlay(myCompOverlay);
    setTimeout(function()
    {
      var convertor = new BMap.Convertor();
      convertor.translate(self.layerService.lineArray, 0, ComplexCustomOverlay.prototype.initialize);
    }, 1000);
    self.map.addEventListener("zoomend", function(){   
      ComplexCustomOverlay.prototype.initialize(this);    
    });
    return canvasWidthHeight;
  }
}