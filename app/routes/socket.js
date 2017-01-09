/*
 * Serve content over a socket
 */


module.exports = function (socket) {
    socket.on('stepAdded', function(data){
      socket.broadcast.emit("afterStepAdded",{
        step: data
      });
    });

    socket.on('sendChatMessage', function(data){
      socket.broadcast.emit("afterSendChatMessage",{
        message: data
      });
    });

    socket.on('chatMessagesRead', function(data){
      socket.broadcast.emit("afterChatMessagesRead",{
        data: data
      });
    });
};
