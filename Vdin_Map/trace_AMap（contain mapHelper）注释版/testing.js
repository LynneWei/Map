Testing = {
  initialize: function()
  {
    $("body").on(
      "click",
      "#showTrace",
      Vdin.Map.Trace.paint
    )
  }
}
