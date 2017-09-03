


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
var http = require('http');

var app = express();

var databasePort = 3000;
var port = 5000;

const connectionOptions = {
    host: 'localhost',
    port: databasePort,
    method: 'GET',
    path: '/create/nick',
    headers: {},
}

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/**
 * RETURN FALSE
 */

app.get('/create/:name', function (req, res){
    console.log('GOT request from' + (req.headers['x-forwarded-for'] || req.connection.remoteAddress));
    http.get('http://localhost:3000/create/' + req.params.name, function (data) {
        console.log('In the call back');
        var body = '';
        data.on('data', function(chunk) {
            console.log('Got data: ' + chunk);
            body += chunk
        })
        data.on('end', function(){
            console.log('end');
            res.send(body).end()
        })
    }).on('error', function (err) {
        console.error(err)
        res.send(err)
    })
})

app.get('/get', function (req, res){
    console.log('GOT request from' + (req.headers['x-forwarded-for'] || req.connection.remoteAddress));
    http.get('http://localhost:3000/get', function (data) {
        console.log('In the call back');
        var body = '';
        data.on('data', function(chunk) {
            console.log('Got data: ' + chunk);
            body += chunk
        })
        data.on('end', function(){
            console.log('end');
            res.send(body).end()
        })
    }).on('error', function (err) {
        console.error(err)
        res.send(err)
    })
})



/**
 * PROJECT DATA SECTION
 */







/**
 * This is were the listener is finally set up
 */

app.listen(port, function() {
    console.log('Nicks Task manager is listening on port ' + port)
})