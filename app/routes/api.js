var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


router.get('/', function(req, res, next) {
    res.send('Hello World !');
});


router.get('/category', function(req, res, next) {
    res.send('Hello World !');
});

module.exports = router;