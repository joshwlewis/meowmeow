$(function() {
  $.ajaxSetup({
    cache: false,
    statusCode: {
      401: function () {
        app.vent.trigger('change:token', null);
      }
    }
  });
});
