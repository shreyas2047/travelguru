var configuration = require("./environment/development.js");

var mongoose = require('mongoose');


module.exports = function() {
    var db = mongoose.connection;
    mongoose.connect(configuration.dbConnection);
    db.on('error', function(evt, args) {
        console.log(evt);
        console.log("Error in connecting to db");
    });
    db.once('open', function() {
        console.log("database Connected");
    });

    require('../register/register.model.js');

    require('../blog/blog.model.js');

    require('../user/user.model.js');
    require('../products/product.js');
};