var mapHelper = {
  lineArray: null,
  initialize: function(options)
  {
    self = mapHelper;
    self.lineArray = options.lineArray;
  },

  caculateCenterPoint: function()
  {
    var self = mapHelper;

    var sumLongitude    = 0;
    var sumLatitude     = 0;
    var centerLongitude = 0;
    var centerLatitude  = 0;
    var center          = null;
    var traceCenter     = null;

    for(var m = 0; m < self.lineArray.length; m++)
    {
      sumLongitude += self.lineArray[m][0];
      sumLatitude  += self.lineArray[m][1];
    }

    centerLongitude = sumLongitude / self.lineArray.length;
    centerLatitude  = sumLatitude / self.lineArray.length;
    traceCenter     = [centerLongitude.toPrecision(8), centerLatitude.toPrecision(8)];
    center          = traceCenter;

    return center;
  }
}