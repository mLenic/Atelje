var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  created_at: Date,
  updated_at: Date
});


var User = mongoose.model('User', userSchema);

var initUsers = function(db) {

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

      collection.save(user, function (err) {
          if (err) {
          console.error('Error when saving user: ' + err);
          }

          console.log('Initial user saved successfully!');
      });
  
  });
}


// make this available to our users in our Node applications
module.exports =  {
  User: User,
  initUsers: initUsers,
}