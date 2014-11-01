RatingCollection = Backbone.Collection.extend({
  url: config.apiHost + '/ratings',
  model: Rating
});
