var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var speeds = require('./routes/speed');
var temperatures = require('./routes/temperature');
var positions = require('./routes/position');
var users = require('./routes/users');
var scooters = require('./routes/scooters');

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
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/', routes);
app.use('/speeds', speeds);
app.use('/temperatures', temperatures);
app.use('/positions', positions);
app.use('/users', users);
app.use('/scooters', scooters);

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