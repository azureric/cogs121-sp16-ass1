var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	"twitterID": String,
    "token": String,
    "username": String,
    "displayName": String,
    "photo": String
});

var NewsfeedSchema = new mongoose.Schema({
	"user": String,
	"photo": String,
	"message": String,
	"posted": Date
});

exports.User = mongoose.model("User", UserSchema);
exports.Newsfeed = mongoose.model("Newsfeed", NewsfeedSchema);