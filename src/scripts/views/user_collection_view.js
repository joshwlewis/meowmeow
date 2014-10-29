UserCollectionView = Marionette.CollectionView.extend({
  tagName: 'ul',
  className: 'list user-collection-view',
  getChildView: function() {
    return UserItemView;
  }
});
