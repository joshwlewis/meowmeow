var backboneSync = Backbone.sync;

Backbone.sync = function (method, model, options) {
  options.headers = {
    'Authorization': 'Bearer ' + app.request('token')
  };
  backboneSync(method, model, options);
};
