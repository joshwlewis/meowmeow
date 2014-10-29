UserItemView = Marionette.LayoutView.extend({
  tagName: 'li',
  className: 'list-item user-item-view',
  getTemplate: function() {
    if (this.model.selected) {
      return 'user_item_detail';
    } else {
      return 'user_item_basic';
    }
  },
  regions: {
    rating_container: '#rating-container'
  },
  ui: {
    beenz_line: '.beenz-line'
  },
  modelEvents: {
    'selected': 'render',
    'deselected': 'render'
  },
  events: {
    click: 'toggleSelected'
  },
  toggleSelected: function() {
    this.model.toggleSelected();
  },
  onRender: function() {
    this.updateBeenz();
    this.showRating();
  },
  updateBeenz: function() {
    this.ui.beenz_line.html('');
    var beenz = this.model.get("beenz");
    for (i = 1; i <= 5; i++) {
      if (beenz >= i) {
        var image = $('<img>')
              .prop('src', '/beenz-' + beenz + '.png')
              .addClass("beenz");
        this.ui.beenz_line.append(image);
      }
    }
  },
  showRating: function() {
    if (app.request('profile').id && this.model.selected) {
      var rating = app.request('rating', this.model.id);
      view = new RatingView({ model: rating });
      this.rating_container.show(view);
    }
  }
});
