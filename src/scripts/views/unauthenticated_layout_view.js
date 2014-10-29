UnauthenticatedLayoutView = Marionette.LayoutView.extend({
  template: 'unauthenticated_layout',
  className: 'unauthenticated-layout-view',
  regions: {
    login_container: '#login-container',
    register_container: '#register-container'
  },
  onRender: function() {
    this.showLoginView();
    this.showRegisterView();
  },
  onDestroy: function() {
    this.hideModals();
  },
  hideModals: function() {
    console.log('hiding modals', this.$el.find('.modal'));
    this.$el.find('.modal').modal('hide');
    $('body .modal-backdrop').remove();
  },
  showLoginView: function() {
    var session = new Session();
    var view = new SessionFormView({ model: session });
    this.listenTo(view, 'hide', this.hideModals);
    this.login_container.show(view);
  },
  showRegisterView: function() {
    var view = new ProfileFormView({ model: app.request('profile') });
    this.listenTo(view, 'hide', this.hideModals);
    this.register_container.show(view);
  }
});
