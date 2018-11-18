var express = require("express");
var path = require("path");


// Initial app
var app = express();

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine","ejs");


//setup public folder
app.use(express.static(path.join(__dirname,"public")));

//setup index
app.get('/',function(req, res){
  res.send("Ini adalah index yeah...")
});

//setup server
var port = 8000;
app.listen(port, function() {
  console.log("Server jalan di port 8000");
});