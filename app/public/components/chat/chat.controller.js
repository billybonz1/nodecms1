export default class ChatController {
    constructor($http,$stateParams,$cookies,$rootScope,socket,$timeout) {
        'ngInject';
        this.$stateParams = $stateParams;
        this.$http = $http;
        this.$rootScope = $rootScope;
        this.messages = [];
        this.chatUserAvatar = "";
        this.socket = socket;
        this.$timeout = $timeout;
        this.messagesRead = [];
        this.messagesReadIndexes = [];
        this.chatWindow = document.getElementById("chat");

        // Messages to skip (when scrolling)
        this.skip = 0;
        this.scroll = true;



        this.chatWindow.onscroll = () => {
            if(this.chatWindow.scrollTop <= 270 && this.scroll){
              this.scroll = false;
              this.skip += 15;
              this.$http({
                method: 'POST',
                url: '/api/chat',
                headers: {
                  'Authorization': this.$rootScope.token
                },
                data: {
                  skip: this.skip,
                  to: this.$stateParams.username,
                  from: this.$rootScope.username
                }
              }).success((data) => {
                  if(data.length > 0){
                    let oldScrollHeight = this.chatWindow.scrollHeight;
                    let scrollTop = this.chatWindow.scrollTop;
                    this.messages = data.concat(this.messages);

                    this.$timeout(() => {
                      let newScrollHeight = this.chatWindow.scrollHeight;
                      this.chatWindow.scrollTop = newScrollHeight - oldScrollHeight;
                      this.scroll = true;
                    }, 10);
                  }


              });
            }
        }



        this.socket.on("afterSendChatMessage", (data) => {
            if(this.$stateParams.username == data.message.from && this.$rootScope.username == data.message.to){
              this.messages.push(data.message);
              this.$timeout(() => {
                this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
              }, 10);
            }
        });


        this.socket.on("afterChatMessagesRead", (data) => {
            this.messages.forEach((element, index, array) => {
                let result = data.data.indexOf(element._id);
                if(result > -1){
                  this.messages[index].viewed = true;
                }
            });
        });



        if(this.$stateParams.username === this.$rootScope.username){
          window.location.href = "#/";
        }

    }

    initChat(){
      if(!this.$rootScope.token){
        window.location.href = "#/";
      }

      this.$http({
        method: 'GET',
        url: '/api/user/' +  this.$stateParams.username + "/avatar",
      }).success((data) => {
          this.chatUserAvatar = data.avatar;
      });

      this.$http({
        method: 'POST',
        url: '/api/chat',
        headers: {
          'Authorization': this.$rootScope.token
        },
        data: {
          skip: this.skip,
          to: this.$stateParams.username,
          from: this.$rootScope.username
        }
      }).success((data) => {
          this.messages = data;

          this.$timeout(() => {
            this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
          }, 10);
      });
    }

    sendMessage(){
      let message = this.message;
      this.message = "";
      if(message){
        this.$http({
          method: 'POST',
          url: '/api/chatMessageSend',
          headers: {
            'Authorization': this.$rootScope.token
          },
          data: {
            message: message,
            from: this.$rootScope.username,
            to: this.$stateParams.username
          }
        }).success((data) => {
            this.messages.push(data);
            this.socket.emit("sendChatMessage", data);
            this.$timeout(() => {
              this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
            }, 10);
        });
      }
    }

    beforeSendMessage(event){
      if(event.shiftKey && event.code == "Enter"){
          event.preventDefault();
          this.sendMessage();
      }
    }



    messageRead(){
        this.messages.forEach((element, index, array) => {
          if(element.viewed === false && element.to == this.$rootScope.username){
            this.messagesRead.push(element._id);
            this.messagesReadIndexes.push(index);
          }
        });

        if(this.messagesRead.length > 0){
          this.$http({
            method: 'POST',
            url: '/api/chatMessagesRead',
            headers: {
              'Authorization': this.$rootScope.token
            },
            data: {
              messages: this.messagesRead
            }
          }).success((data) => {

              this.messagesReadIndexes.forEach((element, index, array) => {
                this.messages[element].viewed = true;
              });

              this.socket.emit("chatMessagesRead", this.messagesRead);

              this.messagesRead = [];
              this.messagesReadIndexes = []
          });
        }

    }

    messagesDate(message,index){
      console.log(message,index);
    }


}
