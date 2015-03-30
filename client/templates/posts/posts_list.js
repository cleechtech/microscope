
// display a list of posts
Template.postsList.helpers({
  posts: function(){
    return Posts.find({}, {sort: {submitted: -1}});
  }
});