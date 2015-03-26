
Template.postSubmit.events({
	'submit form': function(e){
		// block browser from submitting the form
		e.preventDefault();

		var post = {
			// parse form fields with the jQuery
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		};

		// A Meteor Method is a server-side function that is called client-side
		// pass post object as an argument to postInsert function
		Meteor.call('postInsert', post, function(error, result){
			if (error) return alert(error.reason);

			if(result.postExists) alert('This link has already been posted!')

			// reroute after post inserted successfully
			Router.go('postPage', {_id: result._id});
		});
	}
})