

var configuration = require("./app/config/environment/development.js");

var mongoose = require("./app/config/mongoose.js")();
//get the port and the connection strings
var app = require("./app/config/express.js")();
//got the instance of express
app.listen(configuration.port);
//run the server.
console.log("app running at port"+configuration.port);
