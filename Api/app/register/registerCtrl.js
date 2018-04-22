var userDetailModel = require('mongoose').model('userDetail');
var registerCtrl = {};
var crypto = require('crypto'),
 jwt = require("jwt-simple");

registerCtrl.get = function (req, res) {
    //res.send("<h1>Hello Register</h1>");
    if(req.session.authenticated){
        console.log("user authenticated");
    }
    else{
        console.log("User didnot authenticated");
    }
    res.render("register");
};

registerCtrl.post = function (req, res) {
    console.log(req.body);
    var user = new userDetailModel(req.body);
    userDetailModel.find({ userName: req.body.userName },
        function (err, data) {
            if (err) {
                res.send("error occureed");
            }
             console.log(data);
            if (data.length==0) {
                user.save(function (err, data) {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    }
                    let result = {
                        token: generateToken(data),
                        data:data
                    }
                    res.json(result);
                });
            }
            else{
               
                res.send("Username exists");
            }
        });


};

registerCtrl.login = function (req, res) {
    res.render("login");
};
registerCtrl.authenticate = function (req, res) {
     console.log(req.body);
    userDetailModel.findOne({ userName: req.body.userName },
        function (err, data) {
            if (err) {
                res.json({status:"400"});//incorrect database
            }
            if (!data) {
               res.send({status:"401"});//user doesnot exist

            }
            else{
              if(data.password==getEncryptedPassword(req.body.password)){
                 console.log(req.session);
                 //res.json(data);
                 // req.session.authenticated.status=true;
                  //console.log(req.session);
                  //res.send("User Authenticated");
                 // res.render("default");
                 let result = {
                    token: generateToken(data),
                    data:data,
                    status:"200"
                }
                res.json(result);
              }
              else{
                  res.send("402");//password mismatch
              }
            }
        });
};
registerCtrl.getprofile = (req,res)=>{
    userDetailModel.findOne({ userName: req.body.details.userName },
        function (err, data) {
            if (err) {
                res.json({status:"error occureed"});
            }
            if (!data) {
               res.send({status:"user doesnot exist"});
            }
            else{
               res.json(data);
              }
            });
        
}
function getEncryptedPassword(password){
     var md5 = crypto.createHash('md5');
           password = md5.update(password).digest('hex');
           
            return password;
}


function generateToken(data) {
    var token = "JWT " + jwt.encode(data, "MYSECRET");
    return token;
}

module.exports = registerCtrl;