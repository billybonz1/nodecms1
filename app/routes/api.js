var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var functions = require('../functions');
var Category = require('../models/categories');
var Step = require('../models/steps');
router.get('/', function(req, res, next) {
    res.send('Hello World !');
});


router.get('/categories', function(req, res, next) {
    Category.getCategories(function(err, genres){
        if(err){
            throw err;
        }
        res.json(genres);
    });
});

router.post('/categories', function(req, res, next) {
    var category = req.body;
    Category.addCategory(category, function(err, category){
        if(err){
            throw err;
        }
        res.json(category);
    });
});

router.put('/categories/:_id', function(req, res, next) {
    var id = req.params._id;
    var category = req.body;
    Category.updateCategory(id, category, {}, function(err, category){
        if(err){
            throw err;
        }
        res.json(category);
    });
});

router.delete('/categories/:_id', function(req, res, next) {
    var id = req.params._id;
    Category.deleteCategory(id, function(err, category){
        if(err){
            throw err;
        }
        res.json(category);
    });
});



router.get('/steps', function(req, res, next) {
    Step.getSteps(function(err, steps){
        if(err){
            throw err;
        }
        res.json(steps);
    });
});



// Добавление постов
router.post('/steps', function(req, res, next) {
    var step = {
        name: functions.urlTranslit(req.body.label),
        price: req.body.price,
        currency: req.body.currency,
        label: req.body.label,
        desc: req.body.desc
    };
    Step.addStep(step, function(err, step){
        if(err){
            throw err;
        }
        res.json(step);
    });
});


router.put('/steps/:_id', function(req, res, next) {
    var id = req.params._id;
    var step = {
        name: functions.urlTranslit(req.body.label),
        price: req.body.price,
        currency: req.body.currency,
        label: req.body.label,
        desc: req.body.desc
    };
    Step.updateStep(id, step, {}, function(err, step){
        if(err){
            throw err;
        }
        res.json(step);
    });
});


router.get('/steps/:_id', function(req, res, next) {
    Step.getStepById(req.params._id, function(err, step){
        if(err){
            throw err;
        }
        res.json(step);
    });
});


router.delete('/steps/:_id', function(req, res, next) {
    var id = req.params._id;
    Step.deleteStep(id, function(err, step){
        if(err){
            throw err;
        }
        res.json(step);
    });
});



module.exports = router;