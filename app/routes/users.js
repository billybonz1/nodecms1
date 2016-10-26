var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var functions = require('../functions');
var User = require("../models/user");
var jwt = require('jsonwebtoken');
var config = require('../config/main');
var passport = require('passport');


// Register
router.post('/register', function(req, res){
    if(!req.body.email || !req.body.password){
        res.json({
            success: false,
            message: "Пожалуйста введите email и пароль для регистрации"
        })
    } else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password
        });
        // Attempt to save the new user
    }
    newUser.save(function(err){
        if (err) {
            return res.json({ success: false, message: 'Пользователь с таким e-mail уже существует'});
        }
        res.json({
            success: true,
            message: "Пользователь успещно зарегистрирован."
        })
    });
});


// Authenticate the user and get a JWT

router.post('/authenticate', function(req, res){
    User.findOne({
        email: req.body.email
    }, function(err, user){
        if(err) throw err;

        if(!user){
            res.json({ success: false, message: 'Авторизация провалена. Пользователь не найден.'});
        } else {
            // Check if the password Matches
            user.comparePassword(req.body.password, function(err, isMatch){
               if(isMatch && !err){
                   // Create the token
                   var token = jwt.sign(user, config.secret, {
                      expiresIn: 10080 // in seconds
                   });
                   res.json({ success: true, token: 'JWT ' + token});
               } else {
                   res.json({ success: false, message: 'Авторизация провалена. Паррли не совпадают.'});
               }
            });
        }
    })
});


// Protect dashboard route with JWT
router.get('/dashboard', passport.authenticate('jwt', { session: false }) , function(req, res){
    res.send('Все сработало! ID пользователя: ' + req.user._id + '.');
});



/* GET users listing. */
router.get('/', function(req, res, next) {
    var userID = req.cookies.userID;
    User.find({
    })
        .exec(function(err, users){
           if (err) throw err;
           return res.status(200).json({users: users});
        });
});



//GET login
router.get('/login', function (req, res, next) {
  var noticeWarning = req.cookies.noticeWarning;
  var noticeSuccess = req.cookies.noticeSuccess;
  res.render('users/login',{
      title:'Войти',
      buttonName:'Войти',
      headerTitle:"Войти",
      noticeWarning: noticeWarning,
      noticeSuccess: noticeSuccess
  });
});


//POST login
router.post('/login', function (req, res, next) {
    var email = req.body.email;
    var pass = req.body.password;
    User.findOne({
        email: email,
        encryptedPassword: functions.encryptedPassword(pass)
    })
    .exec(function(err, user){
        if(err) throw err;

        if(!user){
            console.log('E-mail или пароль не верные');
            res.cookie('noticeWarning', 'E-mail или пароль не верные', {
                expires: new Date(Date.now() + 1800)
            });
            return res.redirect('/users/login')
        }else{
            res.cookie('userID', user._id, {
                maxAge: new Date(Date.now() + 10),
                expires: new Date(Date.now() + 9000),
                httpOnly: true
            });
            return res.redirect('/users');
        }
    });
});

//GET SignOUT
router.get('/signout', function (req, res, next) {
    res.clearCookie('userID');
    return res.redirect('/');
});


//GET Register
router.get('/signup', function (req, res, next) {
  var noticeWarning = req.cookies.noticeWarning;
  var noticeSuccess = req.cookies.noticeSuccess;
  res.render('users/register',{
      noticeWarning: noticeWarning,
      noticeSuccess: noticeSuccess
  });
});

//POST Register
router.post('/signup', function (req, res, next) {
  var email = req.body.email;
  var pass = req.body.password;
  var passAgain = req.body.passwordAgain;

  // check if passwords match
  if(pass !== passAgain){
    res.cookie('noticeWarning', 'Пароли не совпадают',{
      expires: new Date(Date.now() + 1800)
    });
    return res.redirect('/users/signup');
  }
  // check if user exists
  User.findOne({
    email: email
  })
  .exec(function(err, user){
    if (err) throw err;
    if(user){
      console.log('User exists');
      res.cookie('noticeWarning', 'Пользователь с данным e-mail существует', {
         expires: new Date(Date.now() + 1800)
      });
      return res.redirect('/users/signup');
    }else{
      // create a new user
      var userNew = new User({
        email: email,
        encryptedPassword: functions.encryptedPassword(pass),
        password: pass
      });
      userNew.save(function (err) {
           if (err) throw err;
           res.cookie('noticeSuccess', 'Регистрация прошла успешно', {
               expires: new Date(Date.now() + 1800)
           });
           return res.redirect('/users/login');
      });
    }

  });
});

module.exports = router;
