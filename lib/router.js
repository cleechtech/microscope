
// set default layout for all routes (template named layout)
Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function(){ return Meteor.subscribe('posts'); }	// avoids flicker
});

// iron router will look for a template with same name as route name
// (renders postsList template in the yield section of default layout)
Router.route('/', { name: 'postsList' });

// dynamic route accessible through router's params._id
Router.route('/posts/:_id', {
	name: 'postPage',
	// specify data context
	data: function(){ return Posts.findOne(this.params._id); }
});

// submit post
Router.route('/submit', {name: 'postSubmit'});

// 404 for invalid postPage routes
Router.onBeforeAction('dataNotFound', {only: 'postPage'});