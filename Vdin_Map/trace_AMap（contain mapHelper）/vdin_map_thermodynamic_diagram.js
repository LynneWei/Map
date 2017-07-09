var Vdin = Vdin || {};
Vdin.Map = Vdin.Map || {};

Vdin.Map.ThermodynamicDiagram = {

  mapService: null,
  points:     null,
  zIndex:     null,
  opacity:    null,
  div:        null,
  zoom:       0,

  initialize: function(options)
  {
    var self = Vdin.Map.ThermodynamicDiagram;

    self.mapService = options.mapService;
    self.points     = options.points;
    self.mapService.setLayerService(self);
    self.zIndex     = options.zIndex;
    self.opacity    = options.opacity;
//     $("body").on(
//       "click",
//       "#showTrace",
//       function(){
// console.info("clicked");
//         self.paint()
//       }
      
//     );
//     $("body").on(
//       "dblclick",
//       "#container2",
//       function(){
// console.info("clicked");
//         self.mapService.bindMapEvent("zoomchange");
//         self.zoom = 100;
//         self.paint(self.zoom)
//       }
      
//     );
  // self.mapService.bindMapEvent("zoomchange");  
  // $('#container2').bind("bindMapEvent", function(eventName){  
    
  // });
  self.mapService.map.on(
      "zoomchange",
      function(event)
      {
// console.info("############");
        // var enabled = self.layerService.isEnabled();
        // if(enabled)
        // {
// console.info(eventName);
          // self.redraw();
          alert("event");
        // }
      }
    );
  console.info(self.mapService.map);
  console.info($("div#container.amap-container"))
  $('#container2').click(function()
  {
    alert("12121");
// console.info(self.mapService.map);
    $("#container").trigger("zoomchange");
    // $(this).trigger("myclick");
  });
    self.paint();
  },

  paint: function(zoom)
  {
    var self = Vdin.Map.ThermodynamicDiagram;

    // self.div        = document.createElement('div');
    // self.div.setAttribute("id", "container2");
    self.div = document.getElementById("container2");

    // self.canvasSize = self.mapService.addLayer(
    //                        self.div,
    //                        self.zIndex+4,
    //                        self.opacity
    //                      );
console.info("self.mapService.map.getSize().width");
console.info(self.mapService.map.getSize().width);
console.info("self.mapService.map.getSize().height");
console.info(self.mapService.map.getSize().height);
    // self.mapService.map.getSize().width += zoom;
    // self.mapService.map.getSize().height += zoom;
console.info("self.mapService.map.getSize().width");
console.info(self.mapService.map.getSize().width);
console.info("self.mapService.map.getSize().height");
console.info(self.mapService.map.getSize().height);
    self.div.width  = self.mapService.map.getSize().width;
    self.div.height = self.mapService.map.getSize().height;
// console.info("self.div.width");
// console.info(self.mapService.map.getSize().width);
// console.info("self.div.height");
// console.info(self.mapService.map.getSize().height);
    self.myHot();
  },

  myHot: function()
  {
    var self = Vdin.Map.ThermodynamicDiagram;

    var config = {
      container: self.div,
      radius: 15,
      opacity: [0,0.8],
      gradient: {
        0.5: 'blue',
        0.65: 'rgb(117,211,248)',
        0.7: 'rgb(0, 255, 0)',
        0.9: '#ffea00',
        1.0: 'red'
      }
    };

    var heatmapInstance = h337.create(config);
    heatmapInstance.getData(self.points);

    var data = {
      max: 100,
      data: self.points
    };
    heatmapInstance.setData(data);
  }
}