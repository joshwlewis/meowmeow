RatingView = Marionette.ItemView.extend({
  template: 'rating',
  ui: {
    beenz: 'img.beenz'
  },
  events: {
    'mouseenter @ui.beenz': 'colorBeenByBeen',
    'mouseleave @ui.beenz': 'colorBeenByBeenz',
    'click @ui.beenz': 'save'
  },
  modelEvents: {
    'sync': 'updateBeenz'
  },
  onRender: function() {
    this.updateBeenz();
  },
  save: function(evt) {
    evt.stopPropagation();
    var img = $(evt.target);
    var num = img.index() + 1;
    this.model.set('beenz', num);
    this.model.save();
  },
  colorBeenByBeen: function(evt) {
    var img = $(evt.target);
    var num = img.index() + 1;
    img.attr('src', '/beenz-' + num + '.png');
  },
  colorBeenByBeenz: function(evt) {
    this.colorizeBeen($(evt.target));
  },
  updateBeenz: function() {
    var _this = this;
    this.ui.beenz.each(function() {
      _this.colorizeBeen($(this));
    });
  },
  colorizeBeen: function(img) {
    var beenz = this.model.get('beenz');
    var num = img.index() + 1;
    var src_num;
    if (num <= beenz) {
      src_num = beenz;
    } else {
      src_num = 0;
    }
    img.attr('src', '/beenz-' + src_num + '.png');
  }
});
