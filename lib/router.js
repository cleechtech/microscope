
// set default layout for all routes (template named layout)
Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function(){ return Meteor.subscribe('posts'); }	// avoids flicker
});

// iron router will look for a template with same name as route name
// (renders postsList template in the yield section of default layout)
Router.route('/', { name: 'postsList' });