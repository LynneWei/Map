var Vdin = Vdin     || {};
Vdin.Map = Vdin.Map || {};

Vdin.Map.Helper = {

  caculateCenterPoint: function(options)
  {
    if (!options.tracePointList)
    {
      throw "The pointList argument is required.";
    }

    var tracePointList = options.tracePointList;
    var sumLongitude   = 0;
    var sumLatitude    = 0;

    $(tracePointList).each(
      function(index, point)
      {
        sumLongitude += point.longitude;
        sumLatitude  += point.latitude;
      }
    );

    var center = {
      longitude: (sumLongitude / tracePointList.length).toPrecision(8),
      latitude:  (sumLatitude / tracePointList.length).toPrecision(8)
    };

    return center;
  }
};
