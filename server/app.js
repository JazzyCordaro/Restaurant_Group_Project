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
});//end initial app.eg

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
    if (err){
      console.log(err);
    }else {
      console.log('connected to database');
      client.query('INSERT INTO waitstaff(fname, lname) VALUES($1, $2)', [fname, lname]);
      res.send({success: true});
    }//end else
  });//end pg connect
});//end app.post
//send to db with sql
//get success response
app.post('/newDiningTable', urlencodedParser, function (req, res) {
  console.log('in .post newDiningTable');
  console.log('req.body', req.body);
  //create variables from req
  var name = req.body.name;
  var capacity = Number(req.body.capacity);
  var status = req.body.status;
  console.log(name, capacity, status);
  //connect to database
  pg.connect( connectionString, function (err, client, done) {
    if (err){
      console.log(err);
    }else {
      console.log('connected to database2');
      client.query('INSERT INTO diningtables(name, capacity, status) VALUES($1, $2, $3)', [name, capacity, status]);
      res.send({success: true});
    }//end else
  });//end pg connect
});//end app.post

app.get('/getemployees', function (req, res) {
  console.log('in /getemployees');
  pg.connect(connectionString, function (err, client, done) {
    if (err){
      console.log(err);
    }else{
      var allEmployees = [];
      var queryResults = client.query('SELECT * FROM waitstaff');
      console.log(queryResults);
      queryResults.on('row', function (row) {
        allEmployees.push(row);
      });
      console.log('allEmployees', allEmployees[0]);
      queryResults.on('end', function () {
        done();
        return res.json(allEmployees);
      });//end queryResults function
    }//end else
  });//end pg connect
});//end app.get

app.get('/gettables', function (req, res) {
  console.log('in /getetables');
  pg.connect(connectionString, function (err, client, done) {
    if (err){
      console.log(err);
    }else{
      var allTables = [];
      var queryResults = client.query('SELECT * FROM diningtables');
      console.log(queryResults);
      queryResults.on('row', function (row) {
        allTables.push(row);
      });
      console.log('allTables', allTables[0]);
      queryResults.on('end', function () {
        done();
        return res.json(allTables);
      });//end queryResults function
    }//end else
  });//end pg connect
});//end app.get

app.post('/updateTable', urlencodedParser, function (req, res) {
  console.log('in .post /updateTable');
  console.log('req.body', req.body);
  //create variables from req
  var server = req.body.server;
  var status = req.body.status;
  console.log(server, status);
  //connect to database
  pg.connect( connectionString, function (err, client, done) {
    if (err){
      console.log(err);
    }else {
      console.log('connected to database3');
      var serverId = client.query('SELECT wait_id FROM waitstaff WHERE fname = $1',[server]);
      res.send({success: true});
    }//end else
  });//end pg connect
});//end app.post
