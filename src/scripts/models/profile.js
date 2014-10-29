Profile = Backbone.Model.extend({
  url: config.apiHost + '/profile',
  defaults: {
    name: null,
    email: null,
    gravatar_url: '/beenz-0.png'
  },
  parse: function(resp) {
    if (resp.token) {
      app.vent.trigger('change:token', resp.token);
      delete resp.token;
    }
    return resp;
  }
});
