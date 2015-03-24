// specify which subsets of data to send to the client

Meteor.publish('posts', function(){
	// return a cursor refrencing all posts
	return Posts.find();
})