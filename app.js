var express = require("express");
var path = require("path");
var mongoose = require('mongoose');
var config = require("./config/database");

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

// Set Routes
var pages = require('./routes/pages.js');

// Redirect

app.use("/", pages);

//setup server
var port = 8000;
app.listen(port, function() {
  console.log("Server jalan di port 8000");
});