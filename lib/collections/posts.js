Posts = new Mongo.Collection('posts');

// $ meteor remove insecure
// client side inserts into collections are no longer allowed

Meteor.methods({
	// server side function to add posts (called from the client)
	postInsert: function(postAttributes){
		check(Meteor.userId(), String);
		check(postAttributes, {
			title: String,
			url: String
		});

		var user = Meteor.user();
		var post = _.extend(postAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		var postId = Posts.insert(post);

		return {
			_id: postId
		};
	}
})