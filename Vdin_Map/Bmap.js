Vdin.Map.BMap = {
  map: null,
  initialize: function(options)
  {
    self = Vdin.Map.BMap;
    
    self.map = new BMap.Map(options.mapContainer);
    self.map.centerAndZoom(new BMap.Point(116.397428, 39.909233), options.zoom+1);
      var polyline = new BMap.Polyline();    
      polyline.setStrokeOpacity(options.strokeOpacity);
      polyline.setStrokeWeight(options.strokeWeight);
      polyline.setStrokeColor(options.traceColor);
      var pointArray = [];
      for(var i = 0;i<options.lineArray.length;i++)
      {
        pointArray.push(new BMap.Point(options.lineArray[i][0],options.lineArray[i][1]));
      }
      polyline.setPath(pointArray);
      console.info(polyline.getPath());
    self.map.addOverlay(polyline);
  }
  
}