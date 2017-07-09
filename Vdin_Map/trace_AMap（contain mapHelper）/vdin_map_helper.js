var Vdin = Vdin     || {};
Vdin.Map = Vdin.Map || {};

Vdin.Map.Helper = {

  caculateCenterPoint: function(options)
  {
    if (!options.pointList)
    {
      throw "The pointList argument is required.";
    }

    var pointList    = options.pointList;
    var sumLongitude = 0;
    var sumLatitude  = 0;

    $(pointList).each(
      function(index, point)
      {
        sumLongitude += point.longitude;
        sumLatitude  += point.latitude;
      }
    );

    var center = {
      longitude: (sumLongitude / pointList.length).toPrecision(8),
      latitude:  (sumLatitude / pointList.length).toPrecision(8)
    };

    return center;
  }
};
