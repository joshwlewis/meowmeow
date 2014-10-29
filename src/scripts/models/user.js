User = Backbone.Model.extend({
  initialize: function(){
    var selectable = new Backbone.Picky.Selectable(this);
    this.select = selectable.select;
    this.deselect = selectable.deselect;
    this.toggleSelected = selectable.toggleSelected;
  },
  defaults: {
    name: null,
    gravatar_url: '/beenz-0.png'
  }
});
