var mapServices = {
  traceColor:null,
  strokeWeight: null,
  initialize: function (options)
  {
    self = mapServices;
    self.traceColor = options.traceColor;
    self.strokeWeight = options.strokeWeight;
    parameterList = {
      lineArray:         options.lineArray,
      traceColor:        options.traceColor,
      zoom:              options.zoom,
      center:            options.center,
      strokeWeight:      options.strokeWeight,
      mapContainer:      options.mapContainer,
      strokeOpacity:     options.strokeOpacity,
      paintRoutesCanvas: self.paintRoutesCanvas,
      caculateCenter:    self.caculateCenter
    }
    if(options.mapType)
    {
      options.mapType.initialize(
        {
          parameterList: parameterList
        }
      );
    }
    else
    {
      Vdin.Map.Trace.AMap.initialize(
        {
          parameterList: parameterList
        }
      );
    }
  },
  paintRoutesCanvas: function(canvas, mapType, lineArray, minLongitude, maxLongitude, minLatitude, maxLatitude, canvasWidth, canvasHeight)
  {
    var self = mapType;
    var i              = 0;
    var currentCanvasX = 0;
    var currentCanvasY = 0;
    cxt = canvas.getContext("2d");
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = canvasWidth;
    while (i < lineArray.length)
    {
      currentCanvasX = ((lineArray[i][0] - minLongitude) * canvasWidth) / (maxLongitude - minLongitude);
      currentCanvasY = (((maxLatitude - minLatitude) - (lineArray[i][1] - minLatitude)) * canvasHeight) / (maxLatitude - minLatitude);
      cxt.lineTo(currentCanvasX, currentCanvasY);
      i++;
    }
    cxt.strokeStyle = self.traceColor;
    cxt.fillStyle = self.traceColor;
    cxt.lineWidth = self.strokeWeight;
    //alert(cxt.strokeStyle);
    cxt.stroke();
    if(mapType==Vdin.Map.Trace.BMap)
    {
      return canvas;
    }
  },
  caculateCenter: function(lineArray, centerPoint)
  {
    var sumLongitude = 0;
    var sumLatitude = 0;
    var centerLongitude = 0;
    var centerLatitude = 0;
    var center;
    var traceCenter;
    for(var m = 0;m<lineArray.length;m++)
    {
      sumLongitude += lineArray[m][0];
      sumLatitude += lineArray[m][1];
    }
    centerLongitude = sumLongitude/lineArray.length;
    centerLatitude = sumLatitude/lineArray.length;
    traceCenter = [centerLongitude.toPrecision(8), centerLatitude.toPrecision(8)];
    center = centerPoint||traceCenter;
    return center;
  }
}