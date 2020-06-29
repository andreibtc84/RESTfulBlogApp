var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

// App config

mongoose.connect("mongodb://localhost/restful_blog_app", {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


// Mongoose/model config

var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// 	title: "Test Blog",
// 	image: "https://images.unsplash.com/photo-1593053272490-e0ed6d6a42c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" ,
// 	body: "Hello this is a blog post!"
// });


//  RESTFUL ROUTES
app.get("/", function(req, res){
	res.redirect("/blogs");
})

// INDEX ROUTE
app.get ("/blogs", function(req, res){
	Blog.find({}, function(err, blogs){
		if(err){
			console.log("error!")
		} else{
			res.render("index", {blogs: blogs});
		}
	});
});

// NEW ROUTE
app.get("/blogs/new", function(req, res){
	res.render("new")
});

// CREATE ROUTE

app.post("/blogs", function(req, res){
	// create blog
	Blog.create(req.body.blog, function(err, newBlog){
		if(err){
			res.render("new");
		} else {
			// then, redirect to the index
			res.redirect("/blogs");
		}
	});
});








app.listen(3000, function() { 
  console.log('Server listening on port 3000'); 
});