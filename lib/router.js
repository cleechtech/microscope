
// set default layout for all routes (template named layout)
Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function(){
		// avoids flicker
		return [
			Meteor.subscribe('notifications')
		]; 
	}
});

// dynamic route accessible through router's params._id
Router.route('/posts/:_id', {
	name: 'postPage',
	waitOn: function(){
		// load comments of post
		return Meteor.subscribe('comments', this.params._id);
	},
	// specify data context
	data: function(){ return Posts.findOne(this.params._id); }
});

Router.route('/posts/:_id/edit', {
	name: 'postEdit',
	data: function(){ return Posts.findOne(this.params._id); }
});

// submit post
Router.route('/submit', {name: 'postSubmit'});

// home page with optional parameter
Router.route('/:postsLimit?', {
	name: 'postsList',
	waitOn: function(){
		var limit = parseInt(this.params.postsLimit) || 5;
		return Meteor.subscribe('posts', { sort: {submitted: -1}, limit: limit });
	},
	data: function(){
		var limit = parseInt(this.params.postsLimit) || 5;
		// return normal JS object instead of cursor
		return {
			// named data context called posts
			posts: Posts.find({}, { sort: {submitted: -1}, limit: limit })
		}
	}
});


var requireLogin = function(){
	if(!Meteor.user()){
		if(Meteor.loggingIn()){
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
}

// 404 for invalid postPage routes
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'})