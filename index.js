// CREATING SERVER CONNECTION FRAMEWORK

// DEPENDENCY: 
// General dependencies
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

// Oauth dependencies 
const cookieParser = require('cookie-parser');
const passport = require('passport');
const config = require('./config');

// EXPRESS APP:
// Setup express app
const app = express();

// APP ROUTES:
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

// DATABASE CALL:
// Connect to the database and load models
var User = require('./server/models/user');
require('./server/models').connect(config.dbUri);

// Middleware functions to: 
// Tell app to parse cookie headers sent between cilent and server
app.use(cookieParser());
//Tell app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
//Tell app to authenticate sessions between cient and server
app.use(session({
    secret: 'some secret password',
    resave: true,
    saveUninitialized: false
}));

// PASSPORT: 
// Initialize passport session
app.use(passport.initialize());
app.use(passport.session());

// Serialize/Deserialize passport user 
passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
passport.deserializeUser((_id, done) => {
    User.findById(_id).then((user) => {
        done(null, user);
    });
});

// Passport local & local-signup strategy
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// Middleware authentication check
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// ROUTE FUNCTIONS:
// Tells app to use these routes
const authRoutes = require('./server/routes/auth');
app.use('/auth', authRoutes);
const apiRoutes = require('./server/routes/api');
app.use('/api', apiRoutes);

// SERVER FUNCTIONS: 
// Tells app to open and start server
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
});
