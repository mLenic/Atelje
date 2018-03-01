//Imported modules
const express = require('express');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
const cors = require('cors');
var md5 = require('md5');

//Custom modules
var globals = require('../../globals');
var user = require('../models/user');
var blog = require('../models/blog');
var mailer = require('../mailing/contact');

var app = express();
const router = express.Router();
const mongoUser = globals.umongodb;
const mongoPass = globals.pmongodb;
var mongoDBuri = 'mongodb://' + mongoUser + ':' + mongoPass + '@ds151908.mlab.com:51908/atelje';

// Connect to the db
MongoClient.connect(mongoDBuri, function (err, db) {
  if (err) {
    console.log(mongoDBuri);
    throw err;
  }

  console.log('Database connected!');

  // set db variable
  this.db = db;
});

getDatabase = function() {
  return this.db;
}

app.set('port', process.env.PORT || 3000)
/**
 * Routes that handle blog 
 * /blogposts - returns an array of all blog posts from database
 * /blogpost/:id - Returns a single blogpost that matches the provided id
 * @Input: Contact form (mail, name and message)
 */
router.get('/blogposts', function (req, res) {
  console.log('Fetching blogs from DB...');

  blog.fetchBlogposts(db)
    .then((blogs) => {
      console.log("got blogs");
      console.log(blogs);
      res.json({
        message: 'success',
        blogs: blogs,
      })
    }).catch((error) => {
      res.json({
        message: 'failure',
        //TODO: Add reporting on failure (mail)
      })
    });
});

router.get('/blogpost/:id', function(req, res){
  var id = req.params.id;
  console.log(id);
});
/**
 * Routes that handle initialization of DB - Shouldn't be in production
 */
router.get('/init/users', function (req, res) {
  console.log('Initalizing database, adding users...');

  user.initUsers(db);

  res.json({
    message: 'success'
  });
});

router.get('/init/blogs', function (req, res) {
  console.log('Initalizing database, adding blogs...');
  blog.initBlog(db);

  res.json({
    message: 'success'
  });
});


/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});


/**
 * Route that handles messaging 
 * @Input: Contact form (mail, name and message)
 */
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

/**
 * Route that handles login 
 * @Input: Contact form (Email and password)
 */
router.post('/login', function (req, res) {

  var setPassword = '65b9e48b0399b3d9010b510079560ebb';
  var setEmail    = 'spela@terapevtski-atelje.si';
  console.log(req.body.password);
  var password = md5(req.body.password);

  if(password === setPassword && req.body.email === setEmail){
    res.status(200);
    res.send("Success");
  } else{
    res.status(400);
    res.send("Error");
  }

});


module.exports = router;