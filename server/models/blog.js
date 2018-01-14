var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema
var blogSchema = new Schema({
    title: String,
    subTitle: String,
    description: String,
    content: String,
    category: String,
    color: String,
    datePosted: Date,
    type: String,
    //TODO: Add pictures
});


var Blog = mongoose.model('Blog', blogSchema);

// make this available to our users in our Node applications
module.exports = {
    Blog: Blog
}