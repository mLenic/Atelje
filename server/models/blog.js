var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create a schema - Let Mongodb decide what $id is, set custom idvalue
var blogSchema = new Schema({
    idvalue: Number,
    title: String,
    subTitle: String,
    description: String,
    content: String,
    category: String,
    color: String,
    datePosted: Date,
    type: String,
    pictures: [{type: String}]
});


var Blog = mongoose.model('Blog', blogSchema);

var fetchBlogposts = function(db){
    return db.collection('blog').find().toArray();  
}

var fetchBlogpost = function(db, id){
    var query = {idvalue: id};
    return db.collection('blog').find(query).toArray();
}


var initBlog = function(db){

    var blog = new Blog({
        idvalue: 0,
        title: 'Testni blog',
        subTitle: 'Strmeti k soncu',
        descrption: 'Strmeti k soncu pomeni iskanje sreče',
        content: 'Sreča je le začetek naše poti in vse to skupaj nas pripelje naprej v neznano.Sreča je le začetek naše poti in vse to skupaj nas pripelje naprej v neznano.Sreča je le začetek naše poti in vse to skupaj nas pripelje naprej v neznano.Sreča je le začetek naše poti in vse to skupaj nas pripelje naprej v neznano.Sreča je le začetek naše poti in vse to skupaj nas pripelje naprej v neznano.Sreča je le začetek naše poti in vse to skupaj nas pripelje naprej v neznano.Sreča je le začetek naše poti in vse to skupaj nas pripelje naprej v neznano.',
        category: 'hipnoza',
        color: 'red',
        datePosted: new Date(),
        type: 'neki',
        pictures: ['https://aaa.aa.com', 'https://bbb.bb.com']
    });
    
    console.log('Inserting blog to db.');
    db.collection('blog').insert(blog, function(err) {
        if(err){
            console.error('Error when saving user: ' + err);
        }
        console.log('Blogs saved successfully!');
    });
}

// make this available to our users in our Node applications
module.exports = {
    Blog: Blog,
    initBlog: initBlog,
    fetchBlogposts: fetchBlogposts,
}