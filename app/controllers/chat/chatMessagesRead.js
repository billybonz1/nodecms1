var functions = require('../../functions');
var Chat = require('../../models/chat');

function chatMessagesRead(req, res, next) {

  Chat.messagesRead(req.body.messages, function(err, messages){
      if(err){
          throw err;
      }
      res.json(messages);
  });
}

module.exports = chatMessagesRead;
