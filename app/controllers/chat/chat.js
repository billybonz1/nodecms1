var functions = require('../../functions');
var Chat = require('../../models/chat');

function chat(req, res, next) {
  var query = {};
  query.to = req.body.to;
  query.from = req.body.from;
  Chat.find({
    'to': {
      $in: [
        req.body.to,
        req.body.from
      ]
    },
    'from': {
      $in: [
        req.body.to,
        req.body.from
      ]
    }
  }).sort({date: -1}).limit(15).skip(req.body.skip).exec(function(error, messages){
       if(error) {
         return res.status(400).send({msg:"Ошибка при поиске."});
       }
       messages = messages.sort(-1);
       var prevMsg = {};
       messages.forEach(function(element, index, array){
         if(prevMsg.date){
           console.log(element.date.getDay() - prevMsg.date.getDay());
         }else{
           prevMsg = element;
         }
       });


       return res.status(200).send(messages);
  });


}

module.exports = chat;
