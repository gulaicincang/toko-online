var express = require('express');
var router  = express.Router();


//setup index
router.get('/',function(req, res){
    // res.send("Ini adalah index yeah...")
    res.render("index", {
      title : "Hepi Soping"
    });
  });

// export
module.exports = router;