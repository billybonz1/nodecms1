class registerController {
    constructor($http,$rootScope,$cookies){
      'ngInject';
      if($cookies.get('token')){
          window.location.href = "#/";
      }
      this.message = "";
      this.checkEmail = function(){
        if(this.email){
          let newUser = {
            email: this.email,
          }
          $http.post('/api/register/checkEmail', newUser).then((response) => {
              if(response.data.success){
                this.message = null;
              }else{
                this.message = response.data.message;
              }

          });
        }
      };

      this.checkUsername = function(){
        if(this.username){
          let newUser = {
            username: this.username,
          }
          $http.post('/api/register/checkUsername', newUser).then((response) => {
              if(response.data.success){
                this.message = null;
              }else{
                this.message = response.data.message;
              }
          });
        }
      };

      this.submitRegister = function(){
        let newUser = {
          email: this.email,
          password: this.password,
          username: this.username
        }
        $http.post('/api/register', newUser).then((response) => {
            if(response.data.success === true){
              $http.post('/api/authenticate', {
                email: this.email,
                password: this.password
              }).then((response) => {
                  this.message = response.data.message;
                  if(response.data.token && response.data.userID){
                    $cookies.put('token', response.data.token);
                    $cookies.put('userID', response.data.userID);
                    $cookies.put('username', response.data.username);
                    $rootScope.token = response.data.token;
                    $rootScope.userID = response.data.userID;
                    $rootScope.username = response.data.username;
                    $rootScope.usernameFirstLetter = response.data.username[0];
                    window.location.href = "#/";
                  }
              });
            }
        });
      };
    }
}

registerController.$inject = ['$http','$rootScope','$cookies'];
export default registerController;
