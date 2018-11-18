var express = require('express');
var router = express.Router();

//halaman admin index
router.get('/',function(req, res){
  res.send('Halaman Admin yeah.. :)');
});

//export
module.exports = router;