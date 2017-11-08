//http://devsmash.com/blog/implementing-max-login-attempts-with-mongoose

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userschema = new Schema({
    name: {type: String, required: true, unique: true},
});


module.exports = mongoose.model('User', userschema);