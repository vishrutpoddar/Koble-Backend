


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

const postOptions = {
    host: 'localhost',
    port: databasePort,
    method: 'POST',
    path: '/api/users',
    agent: false,
    headers: {
        'Content-Type': 'application/json',
    }
    //key: fs.readFileSync('./keys/receive/server.key').toString(),
    //cert: fs.readFileSync('./keys/receive/server.crt').toString(),
    //rejectUnauthorized: false
    //requestCert:  true
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


app.post('/api/users', function (req, res){
    console.log(req.body);
    const request = https.request(postOptions, (response) => {
        response.setEncoding('utf8');
        response.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
            res.send(chunk);
        });
        response.on('end', () => {
            console.log('No more data in response.');
            res.end();
        });
    });
    request.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
        res.status(404).send(e).end();
    });
    // write data to request body
    request.write(JSON.stringify(req.body));
    request.end();

    //emailUser()
});






/**
 * This is were the listener is finally set up
 */

app.listen(port, function() {
    console.log('Nicks Task manager is listening on port ' + port)
})