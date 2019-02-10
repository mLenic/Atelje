var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

var Schema = mongoose.Schema;

// create a schema - Let Mongodb decide what $id is, set custom idvalue
var eventSchema = new Schema({
    idvalue: Number,
    title: String,
    subTitle: String,
    description: String,
    content: String,
    datePosted: Date,
    dateEvent: Date,
    price: Number,
    extra: String,
    applicationsOpen: Boolean,
    pictures: {type: Array, "default": []},
    applications: {type: Array, "default": []}
});

var Event = mongoose.model('Event', eventSchema);

var fetchEvents = function(db){
    return db.collection('event').find().sort({dateEvent: -1}).toArray();
}

var fetchEvent = function(db, id){
    var query = {idvalue: id};
    console.log(query);
    return db.collection('event').find({ "idvalue" : { $in: [id]}}).toArray();
}

var initEvent = function(db){
  var in10Days = new Date();
  in10Days.setDate(new Date() + 10);

  var event = new Event({
      idvalue: 2,
      title: 'Skupinska hipnoterapija.',
      subTitle: 'Poglabljanje vate',
      description: 'Na tej skupinski hipnoterapiji se bomo skupaj sproscali ob zvokih tibetanskih posod.',
      content: 'Na tej skupinski hipnoterapiji se bomo skupaj sproscali ob zvokih tibetanskih posod. Na tej skupinski hipnoterapiji se bomo skupaj sproscali ob zvokih tibetanskih posod. Na tej skupinski hipnoterapiji se bomo skupaj sproscali ob zvokih tibetanskih posod.',
      datePosted: new Date(),
      dateEvent: in10Days,
      price: 15,
      extra: String,
      applicationsOpen: true,
      pictures: [{url: 'https://atelje-psihoterapije.s3.amazonaws.com/mak.jpg'},
                  {url: 'https://atelje-psihoterapije.s3.amazonaws.com/mak.jpg'}],
      applications: [{name: 'Matevz', surname: 'Lenic', email: 'mta_lenko@hotmail.com'},
                    {name: 'Spela', surname: 'Verbnik', email: 'spela.verbnik@gmail.com'}]
  });

  console.log('Inserting event to db.');
  db.collection('event').insert(event, function(err) {
      if(err){
          console.error('Error when saving event: ' + err);
      }
      console.log('Event saved successfully!');
  });
}

var updateApplicants = function(event, user, db, callback) {
  var apps = event.applications;
  apps.push(user);

  event.applications = apps;

  db.collection('event').update(
    {'_id':ObjectId(event._id)},
    {$set :{'applications' : apps}}
    , function(err, result) {
      if(err) {
        console.log("Error updating");
        console.log(err);
        callback(false);
      } else {
        console.log("Successfully updated");
        callback(true);
      }
    });
}

var saveEvent = function(event, db, callback){
  //Check for md5 in request

  //get latest blog ID:
  console.log("Getting events");
  this.fetchEvents(db)
  .then((events) => {
      var latestId = 0;
      console.log("got events");
      events.forEach(event => {
          console.log(event.title);
          if(event.idvalue > latestId){
              latestId = event.idvalue;
          }
      });

      console.log("After getting events, check if event == null or latestId == -1");
      console.log(latestId);
      if(event == null || latestId == -1){
          callback(false);
          return;
      }

      var event = new Event({
        idvalue: latestId + 1,
        title: event.title,
        subTitle: event.subtitle,
        description: event.description,
        content: event.content,
        datePosted: new Date(),
        dateEvent: event.dateEvent,
        price: event.price,
        extra: event.extra,
        pictures: event.pictures,
        applications: event.applications,
    });

      console.log('Inserting new event to db.');
      db.collection('event').insert(event, function(err) {
          if(err){
              console.error('Error when saving event: ' + err);
              callback(false);
          }
          console.log('Event saved successfully!');
          callback(true);
      });


  }).catch((error) => {
      console.log("Got error");
      latestId = -1;
      callback(false);
  });


}
var saveEvent = function(blog, db, callback){}
// make this available to our users in our Node applications
module.exports = {
  Event: Event,
  initEvent: initEvent,
  fetchEvents: fetchEvents,
  fetchEvent: fetchEvent,
  saveEvent: saveEvent,
  updateApplicants: updateApplicants,
}
