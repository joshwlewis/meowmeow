UserCollection = Backbone.Collection.extend({
  url: config.apiHost + '/users',
  model: User,
  initialize: function(){
    var singleSelect = new Backbone.Picky.SingleSelect(this);
    this.select = singleSelect.select;
    this.deselect = singleSelect.deselect;
  }
});
