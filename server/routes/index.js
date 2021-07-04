var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send("That's about me");
});

module.exports = router;
