var models = require("../models");

exports.view = function(req, res) {

	try {
		var user = req.session.passport.user;
	} catch(err) {
		console.log("no user authenticated");
		return;
	}

	// console.log(user.username);
    //
	// models.User.find('username': user.username).exec(displayName);
    //
	// function displayName(err, name) {
	// 	if(err) {
	// 		console.log(err);
	// 		res.send(500);
	// 		return;
	// 	}
	// 	console.log(name);
	// 	res.render('homepage', {'welcome_user': name});
	// }

	res.render('homepage', {'user': user.username});
};