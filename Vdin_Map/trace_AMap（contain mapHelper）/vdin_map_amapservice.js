var Vdin = Vdin     || {};
Vdin.Map = Vdin.Map || {};

Vdin.Map.AMapService = {

  map: null,

  canvas:       null,
  layerService: null,
  zoomRange:    null,

  initialize: function(options)
  {
    var self = Vdin.Map.AMapService;

    if (!options.mapContainer)
    {
      throw "The mapContainer argument is required.";
    }
    if (!options.center)
    {
      throw "The center argument is required.";
    }

    self.zoomRange   = options.zoomRange;
    var mapContainer = options.mapContainer;

    self.map = new AMap.Map(
      mapContainer,
      {
        zoom:   options.zoom,
        center: new AMap.LngLat(115, 39.39)

        // center: [options.center.longitude, options.center.latitude]
      }
    );

    // self.bindMapEvent("dragging");
    // self.bindMapEvent("zoomchange");
    // self.bindMapEvent("resize");

    return self;
  },

  setLayerService: function(layerService)
  {
    var self = Vdin.Map.AMapService;

    if (!layerService)
    {
      throw "The layerService argument is required.";
    }

    self.layerService = layerService;
  },

  addLayer: function(canvas, zIndex, opacity)
  {
    var self = Vdin.Map.AMapService;

    var layer = new AMap.CustomLayer(
      canvas,
      {
        zooms:   self.zoomRange,
        zIndex:  zIndex,
        opacity: opacity
      }
    );
console.info("layer");
console.info(layer);
    layer.setMap(self.map); 
    // layer.show();

    return {
      width:  self.map.getSize().width,
      height: self.map.getSize().height
    };
  },

  getBounds: function()
  {
    var self = Vdin.Map.AMapService;

    var bounds    = self.map.getBounds();
    var northEast = bounds.getNorthEast();
    var southWest = bounds.getSouthWest();

    return {
      minLongitude: southWest.getLng(),
      minLatitude:  southWest.getLat(),
      maxLongitude: northEast.getLng(),
      maxLatitude:  northEast.getLat()
    };
  },

  redraw: function()
  {
    var self = Vdin.Map.AMapService; 
console.info("***********");
    self.layerService.clearRect();
    self.layerService.draw();
  },

  bindMapEvent: function(eventName)
  {
    var self = Vdin.Map.AMapService;
console.info("&&&&&&&&&&&&&");
    self.map.on(
      eventName,
      function(event)
      {
console.info("############");
        // var enabled = self.layerService.isEnabled();
        // if(enabled)
        // {
console.info(eventName);
          self.redraw();
        // }
      }
    );
  }

//   addHeat: function(heatmapData, div)
//   {
//     var self = Vdin.Map.AMapService;

//     var heatmap = new AMap.Heatmap(self.map, {
//             radius: 25, //给定半径
//             opacity: [0, 0.8]
//             // ,gradient:{
//             //  0.5: 'blue',
//             //  0.65: 'rgb(117,211,248)',
//             //  0.7: 'rgb(0, 255, 0)',
//             //  0.9: '#ffea00',
//             //  1.0: 'red'
//             //  }
//         });
// console.info("getMap");
// console.info(heatmap.getMap());
//         //设置数据集：该数据为北京部分“公园”数据
//         heatmap.setDataSet({
//             data: heatmapData,
//             max: 100
//         });
// //     self.map.plugin(["AMap.Heatmap"], function() {
// //         //初始化heatmap对象

// //          heatmap = new AMap.Heatmap(self.map, {
// //             radius: 25, //给定半径
// //             opacity: [0, 0.8]
// //             // ,gradient:{
// //             //  0.5: 'blue',
// //             //  0.65: 'rgb(117,211,248)',
// //             //  0.7: 'rgb(0, 255, 0)',
// //             //  0.9: '#ffea00',
// //             //  1.0: 'red'
// //             //  }
// //         });
// // console.info("getMap");
// // console.info(heatmap.getMap());
// //         //设置数据集：该数据为北京部分“公园”数据
// //         heatmap.setDataSet({
// //             data: heatmapData,
// //             max: 100
// //         });
// // console.info(heatmapData);
// //     });
//   }

};
