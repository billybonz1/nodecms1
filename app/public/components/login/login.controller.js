class loginController {
  constructor($rootScope,$http,$cookies) {
    'ngInject';
    this.message = '';

    if($cookies.get('token')){
      window.location.href = "#/";
    }

    this.login = function(){
      console.log(this.email);
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

            if(response.data.avatar) {
              $rootScope.avatar = response.data.avatar;
            }
            window.location.href = "#/";
          }
      });
    }
  }
}

export default loginController;
