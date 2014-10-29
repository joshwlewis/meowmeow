Session = Backbone.Model.extend({
  urlRoot: config.apiHost + '/session',
  initialize: function() {
    this.on('change:token', function(model, token) {
      app.vent.trigger('change:token', token);
    });
  }
});
