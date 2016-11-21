export function registerController(app){
  app.controller("registerController", ["$cookies", "$scope", "$http", "$rootScope", function($cookies, $scope, $http, $rootScope){
    if($cookies.get('token')){
        window.location.href = "#/";
    }
    $scope.message = "";
    $scope.checkEmail = function(){
      if($scope.email){
        let newUser = {
          email: $scope.email,
        }
        $http.post('/api/register/checkEmail', newUser).then(function(response){
            if(response.data.success){
              $scope.message = null;
            }else{
              $scope.message = response.data.message;
            }

        });
      }
    };

    $scope.checkUsername = function(){
      if($scope.username){
        let newUser = {
          username: $scope.username,
        }
        $http.post('/api/register/checkUsername', newUser).then(function(response){
            if(response.data.success){
              $scope.message = null;
            }else{
              $scope.message = response.data.message;
            }
        });
      }
    };

    $scope.submitRegister = function(){
      let newUser = {
        email: $scope.email,
        password: $scope.password,
        username: $scope.username
      }
      $http.post('/api/register', newUser).then(function(response){
          if(response.data.success === true){
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
                  window.location.href = "#/";
                }
            });
          }
      });
    };
  }]);
}
