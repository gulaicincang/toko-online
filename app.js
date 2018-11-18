var express = require("express");
var path = require("path");
var mongoose = require('mongoose');
var config = require("./config/database");
var bodyParser = require("body-parser");
var session = require("express-session");

// Connection syntax
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Initial app
var app = express();

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine","ejs");


//setup public folder
app.use(express.static(path.join(__dirname,"public")));

//setting routes
var pages = require('./routes/pages.js');
var adminPages = require('./routes/admin_pages.js');


//redirect
app.use('/', pages);
app.use('/admin/pages', adminPages);

//setup body parser middleware
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

//setup session middleware
app.use(session({
  secret: 'Coding Acakadut',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));


//setup server
var port = 8000;
app.listen(port, function() {
  console.log("Server jalan di port 8000");
});