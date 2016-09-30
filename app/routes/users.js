var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var functions = require('../functions');
/* GET users listing. */
router.get('/', function(req, res, next) {
    var User = mongoose.model('User', userScheme);
    var userID = req.cookies.userID;
    User.find({
        _id: userID
    })
        .exec(function(err, user){
           if (err) throw err;
           return res.status(200).json({user: user});
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
    var User = mongoose.model('User', userScheme);
    var email = req.param('email');
    var pass = req.param('pass');
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
    res.cookie('userID',"",{
        maxAge: new Date(Date.now() + 10),
        expires: new Date(Date.now() + 9000),
        httpOnly: true
    });
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
  var User = mongoose.model('User', userScheme);
  var email = req.param('email');
  var pass = req.param('pass');
  var passAgain = req.param('passAgain');

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
        encryptedPassword: functions.encryptedPassword(pass)
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
