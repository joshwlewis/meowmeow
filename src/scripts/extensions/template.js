_.templateSettings = {
    evaluate:    /\{\{\{(.+?)\}\}\}/g,
    interpolate: /\{\{(.+?)\}\}/g
};

JST = {};

Backbone.Marionette.Renderer.render = function (template, data) {
  if (JST[template]) {
    return _.template(JST[template], data);
  } else {
    throw "Template '" + template + "' not found!";
  }
};
