Vdin.Map.Trace = {
  canvas:            null,
  canvasWidthHeight: null,
  context:           null,
  lineArray:         null,
  mapService:        null,
  color:             null,
  weight:            null,

  initialize: function (options)
  {
    var self = Vdin.Map.Trace;

    if (options.lineArray)
    {
      self.lineArray = options.lineArray;
    }
    else
    {
      throw "lineArray is required.";
    }

    if (self.mapService = options.mapService)
    {
      //self.mapService = options.mapService;
      self.mapService.setLayerService(self);
    }
    else
    {
      throw "mapService is required.";
    }

    self.color  = options.color;
    self.weight = options.weight;

    //Testing.initialize();
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
  }
};
