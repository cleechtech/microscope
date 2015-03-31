// specify which subsets of data to send to the client

Meteor.publish('posts', function(options){
	check(options, {
		sort: Object,
		limit: Number
	});
	return Posts.find({}, options);
});

Meteor.publish('comments', function(postId){
	check(postId, String);
	// return a cursor refrencing all comments for post
	return Comments.find({postId: postId});
});

Meteor.publish('notifications', function(){
	// display current user's unread notifications
	return Notifications.find({ userId: this.userId, read: false });
})