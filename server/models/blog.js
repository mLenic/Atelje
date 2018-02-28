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
    pictures: [{type: String}]
});


var Blog = mongoose.model('Blog', blogSchema);

var fetchBlogposts = function(db){
    let blogsArray = null;
    this.db.collection('blog', function (err, collection) {
        if (err) {
          console.error('Error accessing blog collection: ' + err);
        }
    
        collection.find().toArray(function (err, blogs) {
          if (err) {
            console.error('Error fetching blogs collection ' + err);
          }
            blogsArray = blogs;
        });
    });

    return blogsArray;
}

var initBlog = function(db){

    var blog = new Blog({
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

    /* db.collection('blog', function(err, collection){
        if(err){
            console.error('Error accessing blog collection ' + err);
        }

        
        console.log('Inserting blog to db.');
        collection.insert(blog, function(err){
            if(err){
                console.error('Error when saving blog');
            }
            console.log('blog saved successfully!');
        })
    }); */
}

// make this available to our users in our Node applications
module.exports = {
    Blog: Blog,
    initBlog: initBlog,
    fetchBlogposts: fetchBlogposts,
}