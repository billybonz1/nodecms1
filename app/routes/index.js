var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var userID = req.cookies.userID;
  res.render('index', {
    title: "OneStep",
    userID: userID,
  });
});

module.exports = router;
