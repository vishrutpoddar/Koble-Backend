var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    id: {type: String, required: true, unique: true}
});

module.export = mongoose.model('User', userSchema )