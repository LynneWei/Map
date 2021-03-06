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
// console.info("trace initialize");
// console.info("options.lineArray");
// console.info(options.lineArray);
console.info("trace initialize");
    if (options.lineArray)
    {
      self.lineArray = options.lineArray;
// console.info("options lineArray is required");
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
console.info("paint");
    self.canvas            = document.createElement('canvas');
    self.canvasWidthHeight = self.mapService.addLayer(self.canvas);
    self.canvas.width      = self.canvasWidthHeight[0];
    self.canvas.height     = self.canvasWidthHeight[1];
console.info("canvas.width:"+self.canvas.width);
console.info("canvas.height:"+self.canvas.height);

    var resultList   = self.mapService.getLongitudeLatitudeValue();
    var minLongitude = resultList[0];
    var maxLongitude = resultList[1];
    var minLatitude  = resultList[2];
    var maxLatitude  = resultList[3];
console.info("minLongitude:"+minLongitude+",maxLongitude:"+maxLongitude+",minLatitude:"+minLatitude+",maxLatitude:"+maxLatitude);
    self.context     = self.canvas.getContext("2d");

    self.paintTraceCanvas(minLongitude, maxLongitude, minLatitude, maxLatitude);
    //  if(self.mapService == Vdin.Map.BMap)
    // {
    //   return self.canvas;
    // }
  },

  paintTraceCanvas: function(minLongitude, maxLongitude, minLatitude, maxLatitude)
  {
    var self = Vdin.Map.Trace;
console.info("paintTraceCanvas   param  min***");
console.info("minLongitude:"+minLongitude+",maxLongitude:"+maxLongitude+",minLatitude:"+minLatitude+",maxLatitude:"+maxLatitude);
    var currentCanvasX = 0;
    var currentCanvasY = 0;
    var i              = 0;
console.info("paintTraceCanvas");
    while (i < self.lineArray.length)
    {
      currentCanvasX = ((self.lineArray[i][0] - minLongitude) * self.canvas.width) / (maxLongitude - minLongitude);
      currentCanvasY = (((maxLatitude - minLatitude) - (self.lineArray[i][1] - minLatitude)) * self.canvas.height) / (maxLatitude - minLatitude);
      self.context.lineTo(currentCanvasX, currentCanvasY);
console.info("the"+i+",currentCanvasY:"+currentCanvasY+",currentCanvasX:"+currentCanvasX);
      i++;
    }
    self.context.strokeStyle = self.color;
    self.context.lineWidth   = self.weight;
    self.context.stroke();
  }
}