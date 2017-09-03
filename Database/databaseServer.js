


/**
 *  This is going to be the REST API that will
 *  be used to access the databse and provide
 *  interaction
 *
 *  For reference
 *
 *  GET - provides read only access to a resource
 *  PUT - is used to create a new resource
 *  DELETE - is used to remove a resource
 *  POST - used to update an existing resource
 *
 */


var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var app = express();
var port = 3000;


mongoose.Promise = global.Promise;

var connection = mongoose.connect('mongodb://localhost:3979/test', {
    useMongoClient: true,
    promiseLibrary: global.Promise,
});


var userSchema = mongoose.Schema({
    id: {type: String, required: true, unique: true}
});

var User = mongoose.model('User', userSchema);


/**
 * This is were the listener is finally set up
 */

app.get('/create/:name', function (req, res){
    console.log('got a request');
    new User({id: req.params.name}).save(function (err, data) {
        if (err) {
            res.send('404 : the page requested could not be returned').end();
            console.error(err);
        }
        else {
            res.send(data).end();
            console.log('SEND DATA' + data);
        }
    });
});

app.get('/get', function (req, res){
    console.log('got a request');
    User.find({}, function(err, data){
        console.log('got a request + in callback');
        if(err){
            res.send('404 : the page requested could not be returned').end();
            console.log(err);
        }
        else {
            res.send(data).end();
            console.log(data);
        }
    });
});

app.listen(port, function() {
    console.log('Nicks Task manager is listening on port ' + port)
});