var Vdin = Vdin || {};
Vdin.Map = Vdin.Map || {};

Vdin.Map.HeatMap = {

  mapService:       null,
  heatmapPointList: null,
  radius:           null,
  opacityRange:     null, 

  initialize: function(options)
  {
    var self = Vdin.Map.HeatMap;

    self.mapService       = options.mapService;
    self.heatmapPointList = options.heatmapPointList;
    self.radius           = options.radius;
    self.opacityRange     = options.opacityRange;
  },

  draw: function()
  {
    var self = Vdin.Map.HeatMap;
    self.mapService.addHeat(self.heatmapPointList, self.radius, self.opacityRange);
  }

}