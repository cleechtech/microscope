Posts = new Mongo.Collection('posts');

// $ meteor remove insecure
// client side inserts into collections are no longer allowed

// allow client-side post inserts
Posts.allow({
	insert: function(userId, doc){
		// only allow posting if you're logged in
		return !! userId;
	}
});