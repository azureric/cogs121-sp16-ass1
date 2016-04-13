var models = require("../models");
exports.view = function(req, res) {
    /* TODO */
    models.Newsfeed.find({type: 'chat'}).sort('-posted').exec(displayPosts);

    function displayPosts(err, posts) {
    	if(err) {
    		console.log(err);
    		res.send(500);
    		return;
    	} 
    	res.render('chat', {'newsfeed': posts});
    }
};
