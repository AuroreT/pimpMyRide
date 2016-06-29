var dotenv = require('dotenv').config();
var express = require('express');
var passport = require('passport');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var authentication = require('./services/authentication');

var routes = require('./routes/index');
var speeds = require('./routes/speed');
var temperatures = require('./routes/temperature');
var positions = require('./routes/position');
var users = require('./routes/users');
var scooters = require('./routes/scooters');
var token = require('./routes/token');

var database = require('./database');

var app = express();

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';




app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);


    res.setHeader('Access-Control-Expose-Headers', 'token');

    // Pass to next layer of middleware
    next();
});


passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(authentication.tokenStrategy());

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.authenticate('token'));
var verifyAuth = function(req, res, next) {

    if (req.originalUrl === '/token') {
        return next();
    }
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
        return next();
    }
    if (req.accepts('application/json')) {
        return res.status(401).send({err: 'User should be logged'});
    }
};
app.use(verifyAuth);

app.use('/', routes);
app.use('/speeds', speeds);
app.use('/temperatures', temperatures);
app.use('/positions', positions);
app.use('/users', users);
app.use('/scooters', scooters);
app.use('/token', token);



/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);

        if (req.accepts('application/json')) {
            res.send({
                message: err.message,
                error: err,
                title: 'error'
            });
        } else {
            res.render('error', {
                message: err.message,
                error: err,
                title: 'error'
            });
        }
    });


}

app.use(function(err, req, res, next) {
    res.status(err.status || 500);

    if (req.accepts('application/json')) {
        res.send({
            message: err.message,
            error: err,
            title: 'error'
        });
    } else {
        res.render('error', {
            message: err.message,
            error: {},
            title: 'error'
        });
    }
});


module.exports = app;
