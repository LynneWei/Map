Testing = {
  initialize: function()
  {
    $("body").on(
      "click",
      Vdin.Map.Trace.showTraceButtonSelector,
      Vdin.Map.Trace.paint
    )
  }
}
