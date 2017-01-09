var mongoose = require('mongoose');

// User Schema
var ChatSchema = new mongoose.Schema({
    message: {
        type: String
    },
    from: {
        type: String
    },
    to: {
        type: String
    },
    viewed:{
        type: Boolean,
        default: false
    },
    date: {type: Date, default: Date.now}
});


var Chat = module.exports = mongoose.model('Chat', ChatSchema);



// Add Message
module.exports.addMessage = function(message, callback){
    Chat.create(message, callback);
};



//Update Step
module.exports.messagesRead = function(messages,  callback){
    console.log(messages);
    Chat.update({
      '_id': {
        $in: messages
      }
    }, { $set: { viewed: true }}, {multi: true}, callback);
};
