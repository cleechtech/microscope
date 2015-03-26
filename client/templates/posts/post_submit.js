
Template.postSubmit.events({
	'submit form': function(e){
		// block browser from submitting the form
		e.preventDefault();

		var post = {
			// parse form fields with the jQuery
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		};

		post._id = Posts.insert(post);	// returns the generated id
		Router.go('postPage', post);
	}
})