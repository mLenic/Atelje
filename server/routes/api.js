const express = require('express');
const router = express.Router();

const axios = require('axios');

var user = require('../models/user');
var blog = require('../models/blog');

var mailer = require('../mailing/contact');

var mongoose = require('mongoose');
const mongodbUrl = 'mongodb://localhost:27017/AteljePsihoterapije'

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var app = express();

const cors = require('cors');
// Connect to the db
/*MongoClient.connect(mongodbUrl, function (err, db) {
  if (err) {
    throw err;
  }

  console.log('Database connected!');

  // set db variable
  this.db = db;
});*/


getDatabase = function() {
  return this.db;
}

app.set('port', process.env.PORT || 3000)

router.get('/init', function (req, res) {
  console.log('Initalizing database, adding users...');

  //user.initUsers(db);

  res.json({
    message: 'success'
  });
});

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.post('/mailing/contact/new', function (req, res) {

  mailer(req.body, function(status) {
    if(status){
      res.status(200);
      res.send("Sent contact");
    } else{
      res.status(400);
      res.send("Error");
    }
  });
  
  
});

module.exports = router;