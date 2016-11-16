var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var functions = require('../functions');
var Category = require('../models/categories');
var Step = require('../models/steps');
var User = require('../models/user');
var config = require("../config/main");
var jwt = require('jsonwebtoken');
var passport = require('passport');


router.get('/', function(req, res, next) {
    res.send('This is API!');
});


// API Add, Edit, Delete Categories;
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



//Get All Steps
router.get('/steps', function(req, res, next) {
    Step.getSteps(function(err, steps){
        if(err){
            throw err;
        }
        res.json(steps);
    });
});

// Add steps
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
// Edit steps
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

//Get step by ID
router.get('/steps/:_id', function(req, res, next) {
    Step.getStepById(req.params._id, function(err, step){
        if(err){
            throw err;
        }
        res.json(step);
    });
});

//Delete step by ID
router.delete('/steps/:_id', function(req, res, next) {
    var id = req.params._id;
    Step.deleteStep(id, function(err, step){
        if(err){
            throw err;
        }
        res.json(step);
    });
});





//Register new Users
router.post('/register', function(req, res){
    if(!req.body.email || !req.body.password){
        res.json({
            success: false,
            message: "Пожалуйста ввведите e-mail и пароль для регистрации."
        });
    } else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password
        });
        // Attempt to save the new users
        newUser.save(function (err) {
            if(err){
                return res.json({
                    success: false,
                    message: "Пользователь с таким e-mail уже существует."
                })
            }
            res.json({
                success: true,
                message: "Пользователь успешно создан."
            });
        });
    }
});


//Authenticate the user and get JWT
router.post('/authenticate', function(req, res){
    User.findOne({
        email: req.body.email,
    }, function(err, user){
        if (err) throw err;

        if(!user) {
            res.send({
                success: false,
                message: "Авторизация провалена. Пользователь не найден"
            })
        } else {
            // Check if the password matches
            user.comparePassword(req.body.password, function(err, isMatch){
                if(isMatch && !err){
                    //Create the token
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: 10080 //in seconds
                    });
                    res.json({
                        success: true,
                        token: 'JWT ' + token
                    });
                }else {
                    res.send({
                        success: false,
                        message: 'Авторизация провалена. Пароли не совпадают.'
                    });
                }
            });
        }
    })
});


//Protect dashboard Route with JWT
router.get('/dashboard', passport.authenticate('jwt', {session: false}), function (req, res) {
    res.send('It worked! User id is: ' + req.user._id + '.');
});


module.exports = router;