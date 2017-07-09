Vdin     = Vdin     || {};
Vdin.Map = Vdin.Map || {};

Vdin.Map.Helper = {

  caculateCenterPoint: function(options)
  {
    var sumLongitude = 0;
    var sumLatitude  = 0;

    if (options.pointArray)
    {
      var pointArray = options.pointArray;
    }
    else
    {
      throw "The pointArray argument is required.";
    }

    $(pointArray).each(
      function(index)
      {
        sumLongitude += pointArray[index][0];
        sumLatitude  += pointArray[index][1];
      }
    );

    var centerLongitude = sumLongitude / pointArray.length;
    var centerLatitude  = sumLatitude / pointArray.length;
    var center          = [centerLongitude.toPrecision(8), centerLatitude.toPrecision(8)];

    return center;
  }
};
