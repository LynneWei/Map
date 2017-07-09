Vdin.Map.Trace.BMap = {
  map: null,
  canvas: null,
  lineArray: null,
  initialize: function (options)
  {
    var center = options.parameterList.caculateCenter(options.parameterList.lineArray, options.parameterList.center);
    self = Vdin.Map.Trace.BMap;
    self.map = new BMap.Map(options.parameterList.mapContainer,{minZoom:3,maxZoom:18});
    self.map.enableScrollWheelZoom = true;
    self.map.centerAndZoom(new BMap.Point(center[0], center[1]), options.parameterList.zoom+1);
    self.canvas = document.createElement('canvas');
    self.canvas.width  = self.map.getSize().width;
    self.canvas.height = self.map.getSize().height;
    self.lineArray = options.parameterList.lineArray;

    self.ComplexCustomOverlay.prototype = new BMap.Overlay();
    self.ComplexCustomOverlay.prototype.initialize = function(map){
      // this._map = map;
      var resultList = self.getLngLatValue();
      var minLongitude = resultList[0];
      var maxLongitude = resultList[1];
      var minLatitude = resultList[2];
      var maxLatitude = resultList[3];

      self.canvas = options.parameterList.paintRoutesCanvas(self.canvas, self, self.lineArray, minLongitude, maxLongitude, minLatitude, maxLatitude,self.canvas.width,self.canvas.height);
      self.map.getPanes().labelPane.appendChild(self.canvas);
      return self.canvas;
    };
    self.ComplexCustomOverlay.prototype.draw = function()
    {

    };
    var myCompOverlay = new self.ComplexCustomOverlay();
    self.map.addOverlay(myCompOverlay);
    setTimeout(function(){
      var convertor = new BMap.Convertor();
      convertor.translate(self.lineArray, 0, self.ComplexCustomOverlay.prototype.initialize);
    }, 1000);
    self.map.addEventListener("zoomend", function(){    
      self.ComplexCustomOverlay.prototype.initialize(this);    
    });
  },
  getLngLatValue: function ()
  {
    self = Vdin.Map.Trace.BMap;
    var border         = self.map.getBounds();
    var southWest      = border.getSouthWest();
    var northEast      = border.getNorthEast();
    var minLongitude   = southWest.lng;
    var minLatitude    = southWest.lat;
    var maxLatitude    = northEast.lat;
    var maxLongitude   = northEast.lng;
    var resultList = [minLongitude, maxLongitude, minLatitude, maxLatitude];
    return resultList;
  },
  ComplexCustomOverlay: function ()
  {

  }
}