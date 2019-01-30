var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema - Let Mongodb decide what $id is, set custom idvalue
var eventSchema = new Schema({
    idvalue: Number,
    title: String,
    subTitle: String,
    description: String,
    content: String,
    category: String,
    datePosted: Date,
    dateEvent: Date,
    pictures: {type: Array, "default": []},
    applications: {type: Array, "default": []}
});
