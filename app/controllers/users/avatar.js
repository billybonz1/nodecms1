var functions = require('../../functions');
var User = require('../../models/user');

function getUserAvatar(req, res, next) {
  User.findOne({
      username: req.params._username
  }, function(err, user){
      if (err) throw err;

      if(!user) {
          res.send({
              success: false,
              message: "Ошибка. Пользователь с таким никнеймом не найден"
          })
      } else {
        var userObj = {
          avatar: user.avatar
        };
        res.send(userObj);
      }
  });
}

module.exports = getUserAvatar;
