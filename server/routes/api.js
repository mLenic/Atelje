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
var log = require('../models/log');
var blog = require('../models/blog');
var event = require('../models/event');
var mailer = require('../mailing/contact');
var applicationMailer = require('../mailing/application.js');
var upload = require('../upload/file-upload');

var app = express();
const router = express.Router();

const mongoUser = process.env.umongodb || globals.umongodb;
const mongoPass = process.env.pmongodb || globals.pmongodb;
//Change for productions/testing
var mongoDBuri = 'mongodb://' + mongoUser + ':' + mongoPass + '@ds151908.mlab.com:51908/atelje'; //Prod
//var mongoDBuri = 'mongodb://' + mongoUser + ':' + mongoPass + '@ds115579.mlab.com:15579/atelje-test'; //Test


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
 * Routes that handle events
 * /event - returns an array of all events from database
 * /event/:id - Returns a single event that matches the provided id
 * */
router.get('/event', function (req, res) {
  console.log('Fetching events from DB...');

  log.saveLog("Fetch: events", db, req);
  event.fetchEvents(db)
    .then((events) => {
      events.forEach(event => {
        event.applications = [];
      });

      res.json({
        message: 'success',
        events: events,
      })
    }).catch((error) => {
      res.json({
        message: 'failure',
        //TODO: Add reporting on failure (mail)
      })
    });
});

router.get('/event/:id', function(req, res){


  var id = Number(req.params.id);

  log.saveLog("Fetch: event " + id, db, req);

  event.fetchEvent(db, id)
        .then((event) => {
          console.log(event.length);
          if(event.length == 0){
            res.status(400);
            res.json({
              message: 'failure',
            })
          } else {;
            event[0].applications = [];

            res.status(200);
            res.json({
              message: 'success',
              event: event,
            })
          }

        }).catch((error) => {
          res.status(400);
          res.json({
              message: 'failure',
            })
          })
});

/**
 * Routes that handle blog
 * /blogposts - returns an array of all blog posts from database
 * /blogpost/:id - Returns a single blogpost that matches the provided id
 * @Input: Contact form (mail, name and message)
 */
router.get('/blogposts', function (req, res) {
  console.log('Fetching blogs from DB...');

  log.saveLog("Fetch: blogposts", db, req);

  blog.fetchBlogposts(db)
    .then((blogs) => {
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


  var id = Number(req.params.id);

  log.saveLog("Fetch: blogpost " + id, db, req);

  blog.fetchBlogpost(db, id)
        .then((blog) => {
          console.log(blog.length);
          if(blog.length == 0){
            res.status(400);
            res.json({
              message: 'failure',
            })
          } else {
            res.status(200);
            res.json({
              message: 'success',
              blog: blog,
            })
          }

        }).catch((error) => {
          res.status(400);
          res.json({
              message: 'failure',
            })
          })
  console.log(id)
});

router.post('/blogposts/new', function (req, res) {
  var setPassword = '65b9e48b0399b3d9010b510079560ebb';
  console.log(req.body.pwd);
  var password = md5(req.body.pwd);

  if(password != setPassword){
    console.log("passwords don't match - ERROR");
    res.status(400);
    res.json({
      message: 'failure',
    })
  } else {
    blog.saveBlogPost(req.body, db, function(status) {
      if(status){
        res.status(200);
        res.json({
          message: 'success',
        })
      } else {
        res.status(400);
        res.json({
          message: 'failure',
        })
      }
    });
  }

});

/**
 * Route that handles AWS S3 file upload signatures
 */
router.post('/sign-s3', function(req, res){


  var setPassword = '65b9e48b0399b3d9010b510079560ebb';
  console.log(req.body.pwd);
  var password = md5(req.body.pwd);

  if(password != setPassword){
    console.log("passwords don't match - ERROR");
    res.status(400);
    res.json({
      message: 'failure',
    })
  } else {
    upload.getSignedS3Url(req, function(data) {
      if(data.status === 'error'){

        res.json({
          message: 'error'
        });
      } else {

        res.json({
          message: 'success',
          data: data.data,
        });
      }

    });
  }
});

/**
 * Routes that handle initialization of DB - Shouldn't be in production
  - Still here for debugging purposes
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

router.get('/init/events', function (req, res) {
  console.log('Initalizing database, adding event...');
  event.initEvent(db);

  res.json({
    message: 'success'
  });
});
*/



/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

/**
 * Route that handles event applications
 * @Input: Contact form (mail, name and event title)
 */
router.post('/mailing/application/new', function (req, res) {

  log.saveLog("Application: Send mail and save user as applicant.", db, req);

  // Fetch event by id
  console.log(req.body);
  var id = Number(req.body.id);
  var usr = {name: req.body.name, email: req.body.email};
  var eventApplication = null;

  event.fetchEvent(db, id)
      .then((evs) => {

        if(evs.length != 0){

          event.updateApplicants(evs[0], usr, db, function(status) {
            if(status) {
              console.log("Successfully updated applications for event: " + evs[0].title);
              log.saveLog("Successfully updated applications for event: " + evs[0].title, db, req);
            } else {
              console.log("Failed to update applications for event: " + evs[0].title);
              log.saveLog("Failed to update applications for event: " + evs[0].title, db, req);
            }
          })

        } else {
          console.log("Failed to get event");
          log.saveLog("Failed to get event with id. " + id, db, req);
        }
      }).catch((error) => {
        console.log("ERROR: Failed to get event");
        log.saveLog("ERROR: Failed to get event with id. " + id, db, req);
        })


  eventApplication = {
    name: req.body.name,
    email: req.body.email,
    title: req.body.title,
  }

  applicationMailer(req.body, function(status) {
    if(status){
      res.status(200);
      res.send("Sent Application");
    } else{
      res.status(400);
      res.send("Error");
    }
  });

});

/**
 * Route that handles messaging
 * @Input: Contact form (mail, name and message)
 */
router.post('/mailing/contact/new', function (req, res) {

  log.saveLog("Mail: Send mail.", db, req);


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
