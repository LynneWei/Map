Vdin.Map.Trace.AMap = {
  map: null,

  canvas:  null,
  lineArray: null,
  traceColor: null,
  traceCenter: null,
  layer: null,

  initialize: function(options)
  {
    var self = Vdin.Map.Trace.AMap;
    var center = options.parameterList.caculateCenter(options.parameterList.lineArray, options.parameterList.center);
    self.map = new AMap.Map(
      options.parameterList.mapContainer,
      {
        zoom:   options.parameterList.zoom,
        center: center
      }
    );
    self.canvas  = document.createElement('canvas');
    self.canvas.width  = self.map.getSize().width;
    self.canvas.height = self.map.getSize().height;
    self.lineArray = options.parameterList.lineArray;
    self.traceColor = options.parameterList.traceColor;

    self.layer = new AMap.CustomLayer(
      self.canvas,
      {
        zooms:   [3,18],
        zIndex:  12,
        opacity: options.parameterList.strokeOpacity
      }
    );
    self.layer.setMap(self.map);

    self.onPaintRoutesChanged(options.parameterList.paintRoutesCanvas);
    
    self.map.on(
      "dragging",
      function (e)
      {
        self.onPaintRoutesChanged(options.parameterList.paintRoutesCanvas);
      }
    );
    self.map.on(
      "zoomchange",
      function (e)
      {
        self.onPaintRoutesChanged(options.parameterList.paintRoutesCanvas);
      }
    );
    self.map.on(
      "resize",
      function (e)
      {
        self.onPaintRoutesChanged(options.parameterList.paintRoutesCanvas);
      }
    );
  },
  onPaintRoutesChanged: function(paintRoutesCanvas)
  {
    self = Vdin.Map.Trace.AMap;
    var resultList = self.getLngLatValue();
    var minLongitude = resultList[0];
    var maxLongitude = resultList[1];
    var minLatitude = resultList[2];
    var maxLatitude = resultList[3];
    paintRoutesCanvas(self.canvas, self, self.lineArray, minLongitude, maxLongitude, minLatitude, maxLatitude,self.canvas.width,self.canvas.height);
  },
  getLngLatValue: function()
  {
    self = Vdin.Map.Trace.AMap;
    var border         = self.map.getBounds();
    var northEast      = border.getNorthEast();
    var southWest      = border.getSouthWest();
    var minLongitude   = southWest.getLng();
    var minLatitude    = southWest.getLat();
    var maxLatitude    = northEast.getLat();
    var maxLongitude   = northEast.getLng();
    var resultList = [minLongitude, maxLongitude, minLatitude, maxLatitude];
    return resultList;
  }
}