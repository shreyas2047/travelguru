var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var morgan = require('morgan');
var fs = require('fs');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');

module.exports = function() {

    require('./passport')(passport); // pass passport for configuration
    var app = express();
    // set up our express application
    app.use(morgan('dev')); // log every request to the console
    app.use(cookieParser()); // read cookies (needed for auth)
    app.use(bodyParser.json()); // get information from html forms
    app.use(bodyParser.urlencoded({ extended: true }));

    app.set('view engine', 'ejs'); // set up ejs for templating

    app.use(session({
        secret: 'ilovescotchscotchyscotchscotch', // session secret
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash());;

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    // function authenticate(req, res, next) {
    //     // if(req.body.user=="kiran"){
    //     //     next();
    //     // }
    //     // else{
    //     //     res.send("user not authenticated");
    //     // }
    //     if (req.session.authenticated == null || req.session.authenticated == undefined) {
    //         req.session.authenticated = { status: false };
    //     }

    //     console.log(req.session);
    //     next();
    // }

    function authorize(req, res, next) {
        if (req.body.role == "manager") {
            next();
        } else {
            res.send("You are authenticated but not authorized");
        }
    }

    console.log(__dirname);
    var accessLogStream = fs.createWriteStream(path.join(__dirname, '../access.log'), { flags: 'a' })

    app.use(morgan('combined', { stream: accessLogStream }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }));
    //custom middle ware.
    // app.use(authorize);
    ///app.use(authenticate);





    //setup the view engine
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'ejs');

    app.use(express.static(path.join(__dirname, '../../public')));

    //route registration.
    require("../register/register.route.js")(app);
    require("../products/products.route.js")(app);
    require("../default/default.route.js")(app);
    require("../blog/blog.route.js")(app);
    require("../user/user.route.js")(app, passport);
    return app;
};
var authenticate = (req, res, next)=> {
    if ((req.url == "/api/login")||(req.url == "/api/register")) {
        next();
    }
    else {
        var token = getToken(req.headers);
        if (token) {
            var decoded = jwt.decode(token,"MYSECRET" );
            if (decoded) {
                req.body.details = decoded;
                next();
            }
            else {
               res.json({status:"Failure"})
            }
        }
        else {
            res.json({status:"Failure"})
        }
    }

}

var getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
};
