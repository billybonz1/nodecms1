export function userMenuController(app){
  app.controller("userMenuController", ["$rootScope", "$cookies", "$scope", "$http", function($rootScope, $cookies, $scope, $http){
      $scope.logout = function(){
          $cookies.remove('token');
          $rootScope.token = null;
          $cookies.remove('username');
          $rootScope.username = null;
          $cookies.remove('userID');
          $rootScope.userID = null;
      };
  }]);
}
