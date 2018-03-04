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
    pictures: {type: Array, "default": []}
});


var Blog = mongoose.model('Blog', blogSchema);

var fetchBlogposts = function(db){
    return db.collection('blog').find().toArray();  
}

var fetchBlogpost = function(db, id){
    var query = {idvalue: id};
    console.log(query);
    return db.collection('blog').find(query).toArray();
}


var initBlog = function(db){

    var blog = new Blog({
        idvalue: 1,
        title: 'Testni blog',
        subTitle: 'Strmeti k soncu',
        descrption: 'Strmeti k soncu pomeni iskanje sreče',
        content: 'Sreča je le začetek naše poti in vse to skupaj nas pripelje naprej v neznano.Sreča je le začetek naše poti in vse to skupaj nas pripelje naprej v neznano.Sreča je le začetek naše poti in vse to skupaj nas pripelje naprej v neznano.Sreča je le začetek naše poti in vse to skupaj nas pripelje naprej v neznano.Sreča je le začetek naše poti in vse to skupaj nas pripelje naprej v neznano.Sreča je le začetek naše poti in vse to skupaj nas pripelje naprej v neznano.Sreča je le začetek naše poti in vse to skupaj nas pripelje naprej v neznano.',
        category: 'hipnoza',
        color: 'red',
        datePosted: new Date(),
        type: 'neki',
        pictures: [{url: 'https://aaa.aa.com'}, {url: 'https://bbb.bb.com'}]
    });
    
    console.log('Inserting blog to db.');
    db.collection('blog').insert(blog, function(err) {
        if(err){
            console.error('Error when saving user: ' + err);
        }
        console.log('Blogs saved successfully!');
    });
}

var saveBlogPost = function(blog, db, callback){
    
    //get latest blog ID:
    console.log("Getting blogs");
    this.fetchBlogposts(db)
    .then((blogs) => {
        var latestId = 0;
        console.log("got blogs");
        blogs.forEach(blog => {
            console.log(blog.title);
            if(blog.idvalue > latestId){
                latestId = blog.idvalue;
            }
        });

        console.log("After getting blogs, check if blog == null or latestId == -1");
        console.log(latestId);
        if(blog == null || latestId == -1){
            callback(false);
            return;
        }
        console.log(blog.pictures);
        var blogPost = new Blog({
            idvalue: latestId + 1,
            title: blog.title,
            subTitle: blog.subtitle,
            descrption: blog.description,
            content: blog.message,
            category: blog.category,
            color: blog.colour,
            datePosted: new Date(),
            pictures: blog.pictures,
            type: '',
            
        });
        console.log('Inserting new blog to db.');
        db.collection('blog').insert(blogPost, function(err) {
            if(err){
                console.error('Error when saving user: ' + err);
                callback(false);
            }
            console.log('Blog saved successfully!');
            callback(true);
        });

        
    }).catch((error) => {
        console.log("Got error");
        latestId = -1;
        callback(false);
    });

    
}

// make this available to our users in our Node applications
module.exports = {
    Blog: Blog,
    initBlog: initBlog,
    fetchBlogposts: fetchBlogposts,
    fetchBlogpost: fetchBlogpost,
    saveBlogPost: saveBlogPost,
}