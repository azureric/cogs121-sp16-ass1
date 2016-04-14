// Node.js Dependencies
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const handlebars = require("express-handlebars");
const passport = require("passport");

require("dotenv").load();
// require('dotenv').config({path: '.env'});


var models = require("./models");
var db = mongoose.connection;


var router = { 
    index: require('./routes/index'),
    chat: require('./routes/chat'),
    homepage: require('./routes/homepage'),
    chatAnxious: require('./routes/chatAnxious'),
    chatDepressed: require('./routes/chatDepressed'),
    chatStressed: require('./routes/chatStressed'),
    chatLonely: require('./routes/chatLonely'),
    chatMeetup: require('./routes/chatMeetup'),
    chatSupport: require('./routes/chatSupport'),
    landing: require('./routes/landing')
};

var parser = {
    body: require("body-parser"),
    cookie: require("cookie-parser")
};

// var strategy = { /* TODO */ };

// Database Connection
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/cogs121');
db.on('error', console.error.bind(console, 'Mongo DB Connection Error:'));
db.once('open', function(callback) {
    console.log("Database connected successfully.");
});


// session middleware
var session_middleware = session({
    key: "session",
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({ mongooseConnection: db })
});

// Middleware
app.set("port", process.env.PORT || 3000);
app.engine('html', handlebars({ defaultLayout: 'layout', extname: '.html' }));
app.set("view engine", "html");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(parser.cookie());
app.use(parser.body.urlencoded({ extended: true }));
app.use(parser.body.json());
app.use(require('method-override')());
app.use(session_middleware);
/* TODO: Passport Middleware Here*/
app.use(passport.initialize());
app.use(passport.session());

/* TODO: Use Twitter Strategy for Passport here */
TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY , 
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET ,
    callbackURL: "/auth/twitter/callback"
}, function(token, token_secret, profile, done) {
    // What goes here? Refer to step 4.
    //console.log(profile);
    models.User.findOne({ "twitterID": profile.id }, function(err, user) {
    // (1) Check if there is an error. If so, return done(err);
    if(err) return done(err);
    
    if(!user) {
        // (2) since the user is not found, create new user.
        var newUser = new models.User({
            "twitterID": profile.id,
            "token": token,
            "username": profile.username,
            "displayName": profile.displayName,
            "photo": profile.photos[0].value
        });

        // Refer to Assignment 0 to how create a new instance of a model
        return done(null, newUser);
    } else {
        // (3) since the user is found, update user's information
        process.nextTick(function() {
            return done(null, user);
        });
    }
  });
}));
/* TODO: Passport serialization here */
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});
// Routes
/* TODO: Routes for OAuth using Passport */
app.get("/", router.index.view);
app.get("/chat", router.chat.view);
app.get("/homepage", router.homepage.view);
app.get("/chatAnxious", router.chatAnxious.view);
app.get("/chatDepressed", router.chatDepressed.view);
app.get("/chatStressed", router.chatStressed.view);
app.get("/chatLonely", router.chatLonely.view);
app.get("/chatMeetup", router.chatMeetup.view);
app.get("/chatSupport", router.chatSupport.view);
app.get("/landing", router.landing.view);


// More routes here if needed
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/homepage',
                                     failureRedirect: '/login' }));
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
io.use(function(socket, next) {
    session_middleware(socket.request, {}, next);
});

/* TODO: Server-side Socket.io here */
io.on('connection', function(socket) {
    socket.on('newsfeed', function(msg) {
        try {
            var user = socket.request.session.passport.user;
        } catch(err) {
            console.log("no user authenticated");
            return;
        }

        var newNewsfeed = new models.Newsfeed({
            'type': 'chat',
            'user': user.username,
            'photo': user.photo,
            'message': msg,
            'posted': Date.now(),
        });

        newNewsfeed.save(saved);
        function saved(err) {
            if(err) {
                console.log(err);
                return;
            }
            io.emit('newsfeed', JSON.stringify(newNewsfeed));
        }
    });

    socket.on('anxiety', function(msg) {
        try {
            var user = socket.request.session.passport.user;
        } catch(err) {
            console.log("no user authenticated");
            return;
        }

        var newAnxietyPost = new models.Newsfeed({
            'type': 'anxiety',
            'user': user.username,
            'photo': user.photo,
            'message': msg,
            'posted': Date.now(),
        });

        newAnxietyPost.save(saved);
        function saved(err) {
            if(err) {
                console.log(err);
                return;
            }
            io.emit('anxiety', JSON.stringify(newAnxietyPost));
        }
    });

    socket.on('depressed', function(msg) {
        try {
            var user = socket.request.session.passport.user;
        } catch(err) {
            console.log("no user authenticated");
            return;
        }

        var newDepressedPost = new models.Newsfeed({
            'type': 'depressed',
            'user': user.username,
            'photo': user.photo,
            'message': msg,
            'posted': Date.now(),
        });

        newDepressedPost.save(saved);
        function saved(err) {
            if(err) {
                console.log(err);
                return;
            }
            io.emit('depressed', JSON.stringify(newDepressedPost));
        }
    });

    socket.on('stressed', function(msg) {
        try {
            var user = socket.request.session.passport.user;
        } catch(err) {
            console.log("no user authenticated");
            return;
        }

        var newStressedPost = new models.Newsfeed({
            'type': 'stressed',
            'user': user.username,
            'photo': user.photo,
            'message': msg,
            'posted': Date.now(),
        });

        newStressedPost.save(saved);
        function saved(err) {
            if(err) {
                console.log(err);
                return;
            }
            io.emit('stressed', JSON.stringify(newStressedPost));
        }
    });


    socket.on('lonely', function(msg) {
        try {
            var user = socket.request.session.passport.user;
        } catch(err) {
            console.log("no user authenticated");
            return;
        }

        var newLonelyPost = new models.Newsfeed({
            'type': 'lonely',
            'user': user.username,
            'photo': user.photo,
            'message': msg,
            'posted': Date.now(),
        });

        newLonelyPost.save(saved);
        function saved(err) {
            if(err) {
                console.log(err);
                return;
            }
            io.emit('lonely', JSON.stringify(newLonelyPost));
        }
    });

    socket.on('meetup', function(msg) {
        try {
            var user = socket.request.session.passport.user;
        } catch(err) {
            console.log("no user authenticated");
            return;
        }

        var newMeetupPost = new models.Newsfeed({
            'type': 'meetup',
            'user': user.username,
            'photo': user.photo,
            'message': msg,
            'posted': Date.now(),
        });

        newMeetupPost.save(saved);
        function saved(err) {
            if(err) {
                console.log(err);
                return;
            }
            io.emit('meetup', JSON.stringify(newMeetupPost));
        }
    });


    socket.on('support', function(msg) {
        try {
            var user = socket.request.session.passport.user;
        } catch(err) {
            console.log("no user authenticated");
            return;
        }

        var newSupportPost = new models.Newsfeed({
            'type': 'support',
            'user': user.username,
            'photo': user.photo,
            'message': msg,
            'posted': Date.now(),
        });

        newSupportPost.save(saved);
        function saved(err) {
            if(err) {
                console.log(err);
                return;
            }
            io.emit('support', JSON.stringify(newSupportPost));
        }
    });

});

// Start Server
http.listen(app.get("port"), function() {
    console.log("Express server listening on port " + app.get("port"));
});