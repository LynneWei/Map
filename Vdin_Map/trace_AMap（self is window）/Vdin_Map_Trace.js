Vdin.Map.Trace = {
  canvas:                  null,
  canvasWidthHeight:       null,
  context:                 null,
  lineArray:               null,
  mapService:              null,
  color:                   null,
  weight:                  null,
  // showTraceButtonSelector: null,

  initialize: function (options)
  {
    var self = Vdin.Map.Trace;
console.info("trace initialize");
console.info("options.lineArray");
// console.info(options.lineArray);
    if (options.lineArray)
    {
      self.lineArray = options.lineArray;
console.info("options lineArray is required");
    }
    else
    {
      throw "lineArray is required.";
    }

    if (options.mapService)
    {
      self.mapService = options.mapService;
      self.mapService.setLayerService(self);
    }
    else
    {
      throw "mapService is required.";
    }

    self.color                   = options.color;
    self.weight                  = options.weight;
    // self.showTraceButtonSelector = options.showTraceButtonSelector;
    // Testing.initialize();
    self.paint();
  },

  paint: function()
  {
    var self = Vdin.Map.Trace;

    self.canvas            = document.createElement('canvas');
    self.canvasWidthHeight = self.mapService.addLayer(self.canvas);
    self.canvas.width      = self.canvasWidthHeight[0];
    self.canvas.height     = self.canvasWidthHeight[1];

    var resultList   = self.mapService.getLongitudeLatitudeValue();
    var minLongitude = resultList[0];
    var maxLongitude = resultList[1];
    var minLatitude  = resultList[2];
    var maxLatitude  = resultList[3];
    self.context     = self.canvas.getContext("2d");

    self.paintTraceCanvas(minLongitude, maxLongitude, minLatitude, maxLatitude);
     if(self.mapService == Vdin.Map.BMap)
    {
      return self.canvas;
    }
  },

  paintTraceCanvas: function(minLongitude, maxLongitude, minLatitude, maxLatitude)
  {
    var self = Vdin.Map.Trace;

    var currentCanvasX = 0;
    var currentCanvasY = 0;
    var i              = 0;

    while (i < self.lineArray.length)
    {
      currentCanvasX = ((self.lineArray[i][0] - minLongitude) * self.canvas.width) / (maxLongitude - minLongitude);
      currentCanvasY = (((maxLatitude - minLatitude) - (self.lineArray[i][1] - minLatitude)) * self.canvas.height) / (maxLatitude - minLatitude);
      self.context.lineTo(currentCanvasX, currentCanvasY);

      i++;
    }
    self.context.strokeStyle = self.color;
    self.context.lineWidth   = self.weight;
    self.context.stroke();

   
  },

  caculateCenterPoint: function(centerPoint)
  {
    //**** self = window;
    if(self == Vdin.Map.AMap)
    {
      console.info("I'm AMap");
    }
    else if(self == Vdin.Map.Trace)
    {
      console.info("I'm trace");
    }
    else if(self == Vdin.Map.BMap)
    {
      console.info("I'm BMap");
    }
    else
    {
      console.info("I don't know.");
    }
    var sumLongitude    = 0;
    var sumLatitude     = 0;
    var centerLongitude = 0;
    var centerLatitude  = 0;
    var center          = null;
    var traceCenter     = null;
console.info("lineArray");
console.info(self.lineArray);
console.info("self");
console.info(self);
    for(var m = 0; m < self.lineArray.length; m++)
    {
      sumLongitude += self.lineArray[m][0];
      sumLatitude  += self.lineArray[m][1];
    }

    centerLongitude = sumLongitude / self.lineArray.length;
    centerLatitude  = sumLatitude / self.lineArray.length;
    traceCenter     = [centerLongitude.toPrecision(8), centerLatitude.toPrecision(8)];
    center          = centerPoint || traceCenter;
console.info("center");
console.info(center);
    return center;
  }
}