AppController = Marionette.Controller.extend({
  showProfile: function() {
    var profile = app.request('profile');
    if (profile.id) {
      var view = new ProfileView({ model: profile });
    } else {
      var view = new UnauthenticatedLayoutView();
    }
    app.header_container.show(view);
  },

  listUsers: function() {
    var users = app.request('users');

    var view = new UserCollectionView({ collection: users });

    app.main_container.show(view);
  }
});
