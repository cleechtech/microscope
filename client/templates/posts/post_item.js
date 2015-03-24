Template.postItem.helpers({
	domain: function(){
		// javascript magic to get the hostname
		var a = document.createElement('a');
		a.href = this.url;
		return a.hostname;
	}
});