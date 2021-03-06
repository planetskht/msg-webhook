'use strict';

// Imports dependencies and set up http server
const
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json()); // creates express http server
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,Authorization');
    res.header("Access-Control-Allow-Headers", '*');
    next();
  });
var fs = require("fs");


// Sets server port and logs message on success
app.listen(process.env.PORT || 1338, () => console.log('webhook is listening'));

app.get('/newinventory', function (req, res) {
   res.status(200).send('{}');
})

app.post('/saveinventory', function (req, res) {
   fs.readFile( __dirname + "/" + "inventory.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.get('/actlinking1', function (req, res) {
   res.status(200).send(Math.random() < 0.5);
})

app.post('/actlinking', function (req, res) {
   res.status(200).send(Math.random() < 0.5);
})

app.get('/inventorydetails', function (req, res) {
   fs.readFile( __dirname + "/" + "inventory.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.post('/importcsv', function (req, res) {
   fs.readFile( __dirname + "/" + "samplecsv.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})


app.get('/inventoryconfiguration/v1/tenants/0p32k3yq/projects/0p32k3yq/schedules', function (req, res) {
   fs.readFile( __dirname + "/" + "schedules.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.get('/configuration/v1/tenants/0p32k3yq/projects/0p32k3yq/InventoryAttributes', function (req, res) {
   fs.readFile( __dirname + "/" + "invattr.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.get('/inventoryconfiguration/v1/tenants/0p32k3yq/projects/0p32k3yq/schedules', function (req, res) {
   fs.readFile( __dirname + "/" + "schedules.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.post('/inventoryconfiguration/v1/tenants/0p32k3yq/projects/0p32k3yq/schedules', function (req, res) {
   fs.readFile( __dirname + "/" + "schedules.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.put('/inventoryconfiguration/v1/tenants/0p32k3yq/projects/0p32k3yq/schedules', function (req, res) {
   res.status(200).send('{}');
})

app.delete('/inventoryconfiguration/v1/tenants/0p32k3yq/projects/0p32k3yq/schedules/:id', function (req, res) {
   res.status(200).send('{}');
})

app.post('/inventory/v1/preview/header', function (req, res) {
   fs.readFile( __dirname + "/" + "headers.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.get('/preview', function (req, res) {
   fs.readFile( __dirname + "/" + "preview.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})


// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {  
 
  let body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the message. entry.messaging is an array, but 
      // will only ever contain one message, so we get index 0
      //let webhook_event = entry.messaging[0];
      console.log(entry);
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});


// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = "abc"
    
  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
  
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});
