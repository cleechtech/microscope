Template.notifications.helpers({
	notifications: function(){
		return Notifications.find({ userId: Meteor.userId(), read: false });
	},
	notificationCount: function(){
		return Notifications.find({ userId: Meteor.userId(), read: false }).count();
	}
});

Template.notificationItem.helpers({
	notificationPostPath: function(){
		return Router.routes.postPage.path({_id: this.postId });
	}
});

Template.notificationItem.events({
	// set read property to true
	'click a': function(){
		Notifications.update(this._is, {$set: {read: true} });
	}
})