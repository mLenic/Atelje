var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var logSchema = new Schema({
    name: String,
    created_at: Date,
});


var Log = mongoose.model('Log', logSchema);

/* var initUsers = function(db) {

  db.collection('user', function (err, collection) {
      if (err) {
        console.error('Error accessing user collection: ' + err);
      }    
  
     
      var user = new User ({
          name: 'Špela',
          username: 'spela.verbnik@gmail.com',
          password: 'test', //Needs to be hashed
          admin: true,
          created_at: new Date(),
          updated_at: new Date(),
      });

      console.log('Inserting user into db.')
      collection.insert(user, function (err) {
          if (err) {
          console.error('Error when saving user: ' + err);
          }

          console.log('User saved successfully!');
      });
  
  });
} */

var saveLog = function(logString, db, req){

        var log = new Log({
            name: logString,
            created_at: new Date(),        
        });
        
        db.collection('log').insert(log, function(err) {
            if(err){
                console.error('Error when saving log: ' + err);
            }
            console.log('Log saved successfully!');
        });
}

// make this available to our users in our Node applications
module.exports =  {
  Log: Log,
  saveLog: saveLog,
}