Posts = new Mongo.Collection('posts');

// $ meteor remove insecure
// client side inserts into collections are no longer allowed

Meteor.methods({
	// server side function to add posts (called from the client)
	postInsert: function(postAttributes){
		// check: from audit-argument-checks package (on by default)
		check(this.userId, String);
		check(postAttributes, {
			title: String,
			url: String
		});

		// check for duplicates
		var postWithSameLink = Posts.findOne({url: postAttributes.url});
		if(postWithSameLink){
			return {
				postExists: true,
				_id: postWithSameLink._id
			};
		}

		var user = Meteor.user();

		// add the goodness
		var post = _.extend(postAttributes, {
			userId: user._id,
			author: user.username,
			submitted: new Date()
		});

		// add to database
		var postId = Posts.insert(post);

		return {
			_id: postId
		};
	}
})