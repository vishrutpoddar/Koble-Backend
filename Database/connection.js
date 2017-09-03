var mongoose = require('mongoose');
var Project = require('./Schema/user')

mongoose.Promise = global.Promise;

var connection = mongoose.connect('mongodb://localhost:3979/test', {
    useMongoClient: true,
    promiseLibrary: global.Promise,
    user: 'myUserName',
    pass: 'myPassword'
});

/*connection.once('error', function(err){
    if(err) {
        console.error(err);
        throw err;
    }
});

connection.once('open', function callback () {
    console.info('- - Mongo DB connected .')
});*/

module.exports = connection;