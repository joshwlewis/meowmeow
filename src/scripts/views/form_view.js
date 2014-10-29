FormView = Marionette.ItemView.extend({
  events: {
    'input input.form-control':       'update',
    'click button[type=\'submit\']':  'save',
    'click button[type=\'reset\']':   'reset'
  },
  update: function(evt) {
    var target = $(evt.target);
    this.model.set(target.attr('name'), target.val());
  },
  save: function(evt) {
    evt.preventDefault();
    this.clearErrors(this.$el);
    this.model.save({},{
      success: _.bind(this.onSaveSuccess, this),
      error: _.bind(this.onSaveError, this)
    });
  },
  reset: function() {
    this.trigger('hide');
    this.render();
  },
  onSaveSuccess: function() {
    this.trigger('hide');
  },
  onSaveError: function(model, resp) {
    var errs = resp.responseJSON.errors;
    if (errs) {
      this.addErrors(errs);
    }
  },
  clearErrors: function($el) {
    $el.children('.has-error').removeClass('has-error');
    $el.children('.error-message').html('');
  },
  addErrors: function(errors) {
    _.forIn(errors, _.bind(function(err, key) {
      var input = this.$el.find('input[name=\'' + key + '\']').first();
      console.log(input);
      if (input) {
        var group = input.closest('.form-group');
        group.addClass('has-error');
        group.children('.error-message').html(err);
      }
    }, this));
  },
  modal: function(toggle) {
    this.$el.closest('.modal').modal(toggle);
  }
});
