exports.view = function(req, res) {

	models.User.find(username).exec(displayName);

	function displayName(err, data) {
		if(err) {
			console.log(err);
			res.send(500);
			return;
		}
		res.render('homepage', {'welcome_user': data});
	}

};