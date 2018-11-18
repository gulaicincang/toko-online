var express = require('express');
var router = express.Router();


//halaman index
router.get('/',function(req, res){
  res.render("index", {
    title: "Happy Shopping"
  })
});

//export
module.exports = router;