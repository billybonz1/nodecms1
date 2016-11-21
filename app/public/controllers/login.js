export function loginController(app){
  app.controller("loginController", ["$rootScope", "$scope", "$http", "$cookies", function($rootScope, $scope, $http, $cookies){
    if($cookies.get('token')){
        window.location.href = "#/";
    }
    $scope.login = function(){
      $http.post('/api/authenticate', {
        email: $scope.email,
        password: $scope.password
      }).then(function(response){
          $scope.message = response.data.message;
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
    };
  }]);
}
