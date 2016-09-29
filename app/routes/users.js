var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var crypto = require('crypto');
var appSecret = Date.now().toString();
/* GET users listing. */
router.get('/', function(req, res, next) {
    var User = mongoose.model('User', userScheme);
    User.find({})
        .exec(function(err, users){
           if (err) throw err;
           return res.status(200).json({users: users});
        });
});

//GET login

router.get('/login', function (req, res, next) {
  res.render('users/login',{buttonName:'Войти',headerTitle:"Войти"});
});


//POST login

router.post('/login', function (req, res, next) {

});


//GET Register

router.get('/signup', function (req, res, next) {
  var notice = req.cookies.notice;
  res.render('users/register',{notice: notice});
});

//POST Register

router.post('/signup', function (req, res, next) {
  var User = mongoose.model('User', userScheme);
  var email = req.param('email');
  var pass = req.param('pass');
  var passAgain = req.param('passAgain');

  // check if passwords match
  if(pass !== passAgain){
    res.cookie('notice', 'Пароли не совпадают',{
      maxAge: new Date(Date.now() + 10)
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
      res.cookie('notice', 'Пользователь с данным e-mail существует', {
        maxAge: new Date(Date.now() + 10)
      });
      return res.redirect('/users/signup');
    }else{
      //encrypt password
      var encryptedPassword = crypto.createHmac('sha256',appSecret)
          .update(pass).digest('hex');
      // create a new user
        console.log(encryptedPassword);
      var userNew = new User({
        email: email,
        pass: encryptedPassword
      });

       userNew.save(function (err) {
            if (err) throw err;
            res.cookie('notice', 'Регистрация прошла успешо', {
                maxAge: new Date(Date.now() + 10)
            });
            return res.redirect('/users/login');
       });
    }

  });
});

module.exports = router;
