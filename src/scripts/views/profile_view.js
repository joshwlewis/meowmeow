ProfileView = Marionette.ItemView.extend({
  template: 'profile',
  className: 'profile-view',
  ui: {
    'beenz_line': '.beenz-line'
  },
  onRender: function() {
    var beenz = this.model.get('beenz');
    for (var been = 1; been <= beenz; been++ ) {
      var img = $('<img>')
                    .addClass('beenz beenz-' + beenz)
                    .attr('src', 'beenz-' + beenz + '.png');
      this.ui.beenz_line.append(img);
    }
  }
});
