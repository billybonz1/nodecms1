var functions = require('../../functions');
var Chat = require('../../models/chat');

function chatMessageSend(req, res, next) {
  var message = {
    message: req.body.message,
    from: req.body.from,
    to: req.body.to
  }

  Chat.addMessage(message, function(err, message){
      if(err){
          throw err;
      }
      res.json(message);
  });
}

module.exports = chatMessageSend;
