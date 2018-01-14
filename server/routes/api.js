const express = require('express');
const router = express.Router();

const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';

var user = require('../models/user');
var blog = require('../models/blog');

var mongoose = require('mongoose');
const mongodbUrl = 'mongodb://localhost:27017/AteljePsihoterapije'

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var app = express();

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

/*router.get('/posts', (req, res) =>{
    axios.get(`${API}/posts`)
    .then(posts => {
      console.log(posts.data);
      res.status(200).send(posts.data);
    })
    .catch(error => {
      res.status(500).send(error)
    });
});*/

module.exports = router;