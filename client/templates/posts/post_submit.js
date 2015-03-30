
Template.postSubmit.created = function(){
	Session.set('postSubmitErrors', {});
};

Template.postSubmit.helpers({
	// passes either title or url as parameter
	errorMessage: function(field){
		return Session.get('postSubmitErrors')[field];
	},
	errorClass: function(field){
		return !!Session.get('postSubmitErrors')[field] ? 'has-error' : '';
	}
});

Template.postSubmit.events({
	'submit form': function(e){
		// block browser from submitting the form
		e.preventDefault();

		var post = {
			// parse form fields with the jQuery
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		};

		// client side validation
		var errors = validatePost(post);	// find errors
		if(errors.title || errors.url)
			return Session.set('postSubmitErrors', errors);	// display to user

		// A Meteor Method is a server-side function that is called client-side
		// pass post object as an argument to postInsert function
		Meteor.call('postInsert', post, function(error, result){
			if (error)
				return throwError(error.reason);

			if (result.postExists)
				throwError('This link has already been posted!');

			// reroute after post inserted successfully
			Router.go('postPage', {_id: result._id});
		});
	}
});