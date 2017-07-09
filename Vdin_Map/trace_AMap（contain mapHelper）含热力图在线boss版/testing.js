var Testing = {

  initialize: function(options)
  {
    var self = Testing;

    $("body").on(
      "click",
      "#showTrace",
      Vdin.Map.Trace.draw
    );
    $("body").on(
      "click",
      "#showHeatMap",
      Vdin.Map.HeatMap.draw
    );
    // Vdin.Map.Trace.draw();
  }
};
