var registerCtrl = require("./registerCtrl.js");

function registerRoute (app){
    app.get("/register",registerCtrl.get);
    app.post("/travelguru/api/register",registerCtrl.post);
    app.get("/login",registerCtrl.login);
    app.post("/travelguru/api/login",registerCtrl.authenticate);
    app.get("/api/getprofile",registerCtrl.getprofile);
}

module.exports= registerRoute;