var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    local: {
        email: String,
        password: String
    },
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    console.log("Validating USER");
    console.log("DB Stored Password: " +
        this.local.password);

    console.log("Our Password: " +
        password);

    console.log("Encrypting the user given passwrod");
    var data = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    console.log("Encrypted Password: " + data);

    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);