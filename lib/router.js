
// set default layout for all routes (template named layout)
Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function(){
		// avoids flicker
		return [
			Meteor.subscribe('posts'),
			Meteor.subscribe('notifications')
		]; 
	}
});

// iron router will look for a template with same name as route name
// (renders postsList template in the yield section of default layout)
Router.route('/', { name: 'postsList' });

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