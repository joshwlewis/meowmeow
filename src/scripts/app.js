app = new Marionette.Application();

app.addInitializer(function() {
  app.controller = new AppController();
  app.router = new AppRouter({
    controller: app.controller
  });
  app.addRegions({
    header_container: '#header-container',
    main_container:   '#main-container'
  });
  app.controller.showProfile();
  app.listenTo(app.request('profile'), 'change:id', function() {
    app.controller.showProfile();
  });
  Backbone.history.start();
});

app.reqres.setHandler('users', function() {
  if (!app.users) {
    app.users = new UserCollection();
    app.users.fetch();
  }
  return app.users;
});

app.reqres.setHandler('profile', function() {
  if (!app.profile) {
    app.profile = new Profile();
    app.profile.fetch();
  }
  return app.profile;
});

app.reqres.setHandler('token', function() {
  return localStorage.getItem('token');
});

app.reqres.setHandler('rating', function(user_id) {
  if (!app.ratings) {
    app.ratings = new RatingsCollection();
    app.ratings.fetch();
  }
  var rating = app.ratings.findWhere({ ratee_id: user_id });
  return rating || app.ratings.add({ ratee_id: user_id });
});

app.vent.on("change:token", function(token) {
  localStorage.setItem('token', token);
  if (token) {
    app.request('profile').fetch();
  } else {
    console.log('clearing profile');
    app.request('profile').clear();
  }
});

$(function() {
  app.start();
});
