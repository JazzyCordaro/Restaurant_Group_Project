var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded( {extended: false});
var portDecision = process.env.PORT || 3000;
var pg = require('pg');
var connectionString = 'postgress://localhost:5432/8_bit_restaurant';

var count = 0;

app.listen( portDecision, function () {
  console.log("3000 is up!");
});//end server up

app.get('/', urlencodedParser, function (req, res) {
  console.log('base url hit');
  res.sendFile(path.resolve('public/index.html'));
});

app.use(express.static('public'));


//get input data from client
app.post('/newEmployee', urlencodedParser, function (req, res) {
  console.log('in .post newEmployee');
  console.log('req.body', req.body);
  //create variables from req
  var fname = req.body.firstName;
  var lname = req.body.lastName;
  //connect to database
  pg.connect( connectionString, function (err, client, done) {
    if (err){console.log(err);}
    else {
      console.log('connected to database');
      client.query('INSERT INTO waitstaff()')

    }

  });
});
//send to db with sql
//get success response
