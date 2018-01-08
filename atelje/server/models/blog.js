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
    picture1: binData,
    picture2: binData,
    picture3: binData,
    picture4: binData,
    picture5: binData,
});


var Blog = mongoose.model('Blog', blogSchema);

// make this available to our users in our Node applications
module.exports = {
    Blog: Blog
}