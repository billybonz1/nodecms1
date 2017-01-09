var functions = require('../../functions');
var User = require('../../models/user');

function profileInfo(req, res, next) {
  User.findOne({
      username: req.params._username,
  }, function(err, user){
      if (err) throw err;

      if(!user) {
          res.send({
              success: false,
              message: "Ошибка. Пользователь с таким никнеймом не найден"
          })
      } else {
        var userObj = {
          email: user.email,
          avatar: user.avatar,
          username: user.username,
          oneLineStory: user.oneLineStory,
          skills: user.skills,
          desc: user.desc
        };
        res.send(userObj);
      }
  });
}

module.exports = profileInfo;
