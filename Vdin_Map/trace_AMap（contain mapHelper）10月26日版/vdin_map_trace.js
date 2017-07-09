Vdin     = Vdin     || {};
Vdin.Map = Vdin.Map || {};

Vdin.Map.Trace = {

  canvas:     null,
  canvasSize: null,
  color:      null,
  context:    null,
  mapService: null,
  opacity:    null,
  pointArray: null,
  weight:     null,
  zIndex:     null,

  initialize: function (options)
  {
    var self = Vdin.Map.Trace;

    if (options.pointArray)
    {
      self.pointArray = options.pointArray;
    }
    else
    {
      throw "The pointArray argument is required.";
    }

    if (self.mapService = options.mapService)
    {
      self.mapService.setLayerService(self);
    }
    else
    {
      throw "The mapService argument is required.";
    }

    self.color   = options.color;
    self.weight  = options.weight;
    self.zIndex  = options.zIndex;
    self.opacity = options.opacity;
  },

  paint: function()
  {
    var self = Vdin.Map.Trace;

    self.canvas        = document.createElement('canvas');
    self.canvasSize    = self.mapService.addLayer(self.canvas, self.zIndex, self.opacity);
    self.canvas.width  = self.canvasSize.width;
    self.canvas.height = self.canvasSize.height;

    var boundsList = self.mapService.getBounds();
    self.context   = self.canvas.getContext("2d");

    self.paintTraceCanvas(boundsList.minLongitude, boundsList.maxLongitude, boundsList.minLatitude, boundsList.maxLatitude);
  },

  paintTraceCanvas: function(minLongitude, maxLongitude, minLatitude, maxLatitude)
  {
    var self = Vdin.Map.Trace;

    var currentCanvasX = 0;
    var currentCanvasY = 0;

    $(self.pointArray).each(
      function(index)
      {
        currentCanvasX = ((self.pointArray[index][0] - minLongitude) * self.canvas.width) / (maxLongitude - minLongitude);
        currentCanvasY = (((maxLatitude - minLatitude) - (self.pointArray[index][1] - minLatitude)) * self.canvas.height) / (maxLatitude - minLatitude);

        self.context.lineTo(currentCanvasX, currentCanvasY);
      }
    );

    self.context.strokeStyle = self.color;
    self.context.lineWidth   = self.weight;
    self.context.stroke();
  }
};
