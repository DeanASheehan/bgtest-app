var express  = require('express');
var app      = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var dotenv = require('dotenv');
var http = require('http');
var request = require('request');
var fs = require('fs');
var config = require('./config');

if (fs.existsSync('.env')) {
    dotenv.load();
}

app.use('/',express.static(__dirname + '/'));
app.use('/bower_components',express.static(__dirname + '/bower_components'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());


let a = 0;
let timer = null;

/*
app.use('/version', function(req, res, next) {
  if (!timer) timer = setInterval(
    ()=>{
      a = a + 25;
      if (a >= 100) {
        a = 0;
      }
      console.log('a threshold now',a);
    },
    30*1000)

  let thisRandom =  Math.random()*100; 
  let result = thisRandom < a ? 'A' : 'B';
  //console.log(a,thisRandom,result)
  res.json({version:result});
});
*/


app.use('/version', function(req, res, next) {
  res.json({version:process.env.VERSION});
});
  

var port = process.env.PORT;
var server = app.listen(port, function() {
    console.log('listening on port ', port);
});

