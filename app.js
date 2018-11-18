var express = require("express");
var path = require("path");
var mongoose = require('mongoose');
var config = require("./config/database");
var bodyParser = require('body-parser');
var session = require('express-session');
var expressValidator = require('express-validator');

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
var adminPages = require('./routes/admin_pages.js');

// Redirect
app.use("/", pages);
app.use('/admin/pages', adminPages);

// MIDDLEWARE | LIBRARY LAH BAHASO AWAK

// Setup Body Parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// setup session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// setup validator middlewareexpress
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//setup connect-flash and express-messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// app.use entah kenapa bisa kayak gini tanpa inisiasi pada variabel

//setup server
var port = 8000;
app.listen(port, function() {
  console.log("Server jalan di port 8000");
});