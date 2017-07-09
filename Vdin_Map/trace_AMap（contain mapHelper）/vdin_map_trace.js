var Vdin = Vdin     || {};
Vdin.Map = Vdin.Map || {};

Vdin.Map.Trace = {

  canvas:     null,
  canvasSize: null,
  color:      null,
  context:    null,
  enabled:    false,
  mapService: null,
  opacity:    null,
  pointList:  null,
  weight:     null,
  zIndex:     null,

  initialize: function(options)
  {
    var self = Vdin.Map.Trace;

    if (!options.pointList)
    {
      throw "The pointList argument is required.";
    }
    if (!options.mapService)
    {
      throw "The mapService argument is required.";
    }

    self.mapService = options.mapService;
    self.pointList  = options.pointList;
    self.color      = options.color;
    self.weight     = options.weight;
    self.zIndex     = options.zIndex;
    self.opacity    = options.opacity;
    self.mapService.setLayerService(self);
  },

  draw: function()
  {
    var self = Vdin.Map.Trace;

    self.canvas        = document.createElement('canvas');
    self.canvasSize    = self.mapService.addLayer(
                           self.canvas,
                           self.zIndex,
                           self.opacity
                         );
    self.canvas.width  = self.canvasSize.width;
    self.canvas.height = self.canvasSize.height;
    self.context       = self.canvas.getContext("2d");
    self.enabled       = true;

    self.drawTraceCanvas(self.mapService.getBounds());

    // return self.enabled;
  },

  isEnabled: function()
  {
    var self = Vdin.Map.Trace;

    return self.enabled;
  },

  drawTraceCanvas: function(bounds)
  {
    var self = Vdin.Map.Trace;

    var currentCanvasX = 0;
    var currentCanvasY = 0;

    $(self.pointList).each(
      function(index, point)
      {
        currentCanvasX = (point.longitude - bounds.minLongitude) * self.canvas.width / (bounds.maxLongitude - bounds.minLongitude);
        currentCanvasY = (bounds.maxLatitude - point.latitude) * self.canvas.height / (bounds.maxLatitude - bounds.minLatitude);

        self.context.lineTo(currentCanvasX, currentCanvasY);
      }
    );

    self.context.strokeStyle = self.color;
    self.context.lineWidth   = self.weight;
    self.context.stroke();
  },

  clearRect: function()
  {
    var self = Vdin.Map.Trace;

    self.context.clearRect(
      0,
      0,
      self.canvas.width,
      self.canvas.height
    );
  }
};
