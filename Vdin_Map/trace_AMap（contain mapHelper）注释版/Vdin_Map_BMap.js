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
    var center        = options.center || mapHelper.caculateCenterPoint();
    self.map.centerAndZoom(new BMap.Point(center[0], center[1]), self.zoom);
    self.map.enableScrollWheelZoom = true;

    ComplexCustomOverlay = function (){};
    var myCompOverlay = new ComplexCustomOverlay();
    self.map.addOverlay(myCompOverlay);
//     setTimeout(function()
//     {
// console.info("setTimeout");
//       var convertor = new BMap.Convertor();
// console.info("Vdin.Map.Trace.lineArray:"+Vdin.Map.Trace.lineArray);
//       convertor.translate(Vdin.Map.Trace.lineArray, 0, ComplexCustomOverlay.prototype.initialize);
//     }, 1000);
    self.map.addEventListener("addtilelayer", function(){
console.info("loading");  
        ComplexCustomOverlay.prototype.initialize(this);    
      });
    self.map.addEventListener("dragging", function(){    
        ComplexCustomOverlay.prototype.initialize(this);    
      });
    
    self.map.addEventListener("zoomend", function(){  
console.info("zoomend"); 
      ComplexCustomOverlay.prototype.initialize(this);    
    });
    console.info("BMap initialize");

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
console.info("resultList:");
console.info(resultList);
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
    
    ComplexCustomOverlay.prototype            = new BMap.Overlay();
    ComplexCustomOverlay.prototype.initialize = function(map)
    {
// console.info("****");
      // self = Vdin.Map.BMap;
console.info("!!!!!ComplexCustomOverlay.prototype.initialize");
      // var resultList   = self.getLongitudeLatitudeValue();
      // var minLongitude = resultList[0];
      // var maxLongitude = resultList[1];
      // var minLatitude  = resultList[2];
      // var maxLatitude  = resultList[3];

      
      map.getPanes().labelPane.appendChild(canvas);
      self.layerService.paint();
    };

    
    ComplexCustomOverlay.prototype.draw = function(){};
    return canvasWidthHeight;
  }
}