Meteor.publish('posts', function(){
	// return a cursor refrencing all posts
	return Posts.find();
})