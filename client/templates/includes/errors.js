
Template.errors.helpers({
	errors: function(){
		// all errors
		return Errors.find();
	}
});

// called when template is rendered in browser
Template.error.rendered = function(){
	var error = this.data;	//sets data context

	Meteor.setTimeout(function(){
		// remove the error from errors list after 3 seconds
		Errors.remove(error._id);
	}, 3000);
}