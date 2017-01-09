var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var functions = require('../functions');
var Category = require('../models/categories');
var Step = require('../models/steps');
var User = require('../models/user');
var Skills = require('../models/skills');
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

// STEPS Controllers

  //Get All Steps
  var getsteps = require("../controllers/steps/getsteps");
  router.get('/steps', getsteps);

  // Add steps
  var addstep = require("../controllers/steps/addstep");
  router.post('/steps', passport.authenticate('jwt', {session: false}), addstep);

  // Edit steps
  var editstep = require("../controllers/steps/editstep");
  router.put('/steps/:_id', passport.authenticate('jwt', {session: false}), editstep);

  //Get step by ID
  var getStepById = require("../controllers/steps/getstepbyid");
  router.get('/steps/:_id', getStepById);

  //Delete step by ID
  var deletestep = require("../controllers/steps/deletestep");
  router.delete('/steps/:_id', passport.authenticate('jwt', {session: false}), deletestep);



//Register new Users
router.post('/register', function(req, res){
    if(!req.body.email || !req.body.password || !req.body.username){
        res.json({
            success: false,
            message: "Пожалуйста ввведите e-mail, никнейм и пароль для регистрации."
        });
    } else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        });
        // Attempt to save the new users
        newUser.save(function (err) {
            if(err){
                return res.json({
                    success: false,
                    message: "Пользователь с такими данными уже существует."
                })
            }
            res.json({
                success: true,
                message: "Пользователь успешно создан."
            });
        });
    }
});

//Check on existing email
router.post('/register/checkEmail', function(req, res){
    User.findOne({
      email: req.body.email
    }, function(err, user){
      if (err) throw err;
      if(user) {
          res.json({
              success: false,
              message: 'Пользователь с таким e-mail уже существует.'
          });
      }else{
        res.json({
            success: true
        });
      }
    });
});

//Check on existing username
router.post('/register/checkUsername', function(req, res){
    User.findOne({
      username: req.body.username
    }, function(err, user){
      if (err) throw err;
      if(user) {
          res.json({
              success: false,
              message: 'Пользователь с таким никнеймом уже существует.'
          });
      }else{
          res.json({
              success: true
          });
      }
    });
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

                    var loginObj = {
                        success: true,
                        token: 'JWT ' + token,
                        userID: user._id,
                        username: user.username
                    }

                    if (user.avatar) loginObj.avatar = user.avatar;

                    res.json(loginObj);
                }else {
                    res.send({
                        success: false,
                        message: 'Авторизация провалена. Неправильный пароль.'
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



//get profile Info
var profileInfo = require("../controllers/users/profileInfo");
router.get('/user/:_username', profileInfo);

//get user Steps
var usersteps = require("../controllers/users/usersteps");
router.get('/user/:_username/steps', usersteps);

//get user Avatar
var getUserAvatar = require("../controllers/users/avatar");
router.get('/user/:_username/avatar', getUserAvatar);



//Change User Avatar

var multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty(),
    fs = require('fs'),
    path = require('path'),
    multer = require('multer');

var avatarStorage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './app/public/img/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

var upload = multer({ //multer settings
    storage: avatarStorage
}).single('file');



router.post('/uploadAvatar',
    passport.authenticate('jwt', {session: false}),
    function (req, res, next) {
        upload(req,res,function(err){

            console.log(req.file);

            if(err){
                res.json({error_code:1,err_desc:err});
                return;
            }

            User.updateUserAvatar(req.user._id, '/img/' + req.file.filename, function(err, user){
                var avatarPath = '/img/' + req.file.filename;
                res.send(avatarPath);
            });
        });
    });

//Change User oneLineStory
router.post('/updateOneLineStory',
    passport.authenticate('jwt', {session: false}),
    function (req, res, next) {
        var oneLineStory = req.body.oneLineStory;
        User.updateOneLineStory(req.user._id, oneLineStory, function(err, user){
            res.send(oneLineStory);
        });
    });


//Change User description
router.post('/updateUserDescription',
    passport.authenticate('jwt', {session: false}),
    function (req, res, next) {
        var desc = req.body.desc;
        User.updateUserDescription(req.user._id, desc, function(err, user){
            res.send(desc);
        });
    });



  //Skills Search
  router.post('/searchSkills',
    function(req, res) {
        var query = {};
        query.label = new RegExp(req.body.label, 'i');
        Skills.find(query, function(error, skills){
             if(error) {
               return res.status(400).send({msg:"Ошибка при поиске."});
             }
             return res.status(200).send(skills);
        });
    });



//Add user skills
router.post('/addSkill',
    passport.authenticate('jwt', {session: false}),
    function(req, res) {
      var skillQuery = {};
      var userSkill = {};
      var skillsArr = req.body.skills;

      skillQuery.label = req.body.newSkill.label;

      Skills.findOne(skillQuery, function (err, skill) {
        if(err) {
          return res.status(400).send({msg:"Ошибка при поиске."});
        }
        if(!skill){
          Skills.addSkill({ label: skillQuery.label }, function(err, newSkill){
              if(err){
                  throw err;
              }
              userSkill = {
                id: newSkill._id,
                label: req.body.newSkill.label,
                level: req.body.newSkill.level
              };
              console.log(userSkill);
              skillsArr.push(userSkill);
          });
        }else{
          userSkill = {
            id: skill._id,
            label: req.body.newSkill.label,
            level: req.body.newSkill.level
          };
          console.log(userSkill);
          skillsArr.push(userSkill);
        }
        console.log(skillsArr);
        User.updateSkills(req.user._id, skillsArr, function(err, user){
            res.send(skillsArr);
        });
      });

});

//Delete user skill
router.post('/deleteSkill',
    passport.authenticate('jwt', {session: false}),
    function(req, res) {
      var skills = req.body.skills;
      var index = req.body.index;
      skills.splice(index,1);
      if(skills.length == 0){
        skills = [];
      }
      User.updateSkills(req.user._id, skills, function(err, user){
          res.send(skills);
      });
    });



    //Update user skill
router.post('/updateSkill',
        passport.authenticate('jwt', {session: false}),
        function(req, res) {
          var skills = req.body.skills;
          User.updateSkills(req.user._id, skills, function(err, user){
              res.send(skills);
          });
});






//Steps Search
router.post('/search', function(req, res) {
    var query = {};
    console.log(req.body.s);
    query.label = new RegExp(req.body.s, 'i');
    Step.find(query, function(error, steps){
         if(error) {
           return res.status(400).send({msg:"Ошибка при поиске."});
         }
         return res.status(200).send(steps);
    });
});





// CHAT
var chat = require("../controllers/chat/chat");
router.post('/chat',
          passport.authenticate('jwt', {session: false}),
          chat);


// Send Message
var chatMessageSend = require("../controllers/chat/chatMessageSend");
router.post('/chatMessageSend',
            passport.authenticate('jwt', {session: false}),
            chatMessageSend);

 

// Send Message
var chatMessagesRead = require("../controllers/chat/chatMessagesRead");
router.post('/chatMessagesRead',
            passport.authenticate('jwt', {session: false}),
            chatMessagesRead);





module.exports = router;
