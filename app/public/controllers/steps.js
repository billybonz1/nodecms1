export function stepsController(app){
  app.controller("stepsController", ["$scope", "$http", "$location", "$stateParams", "$rootScope", "$cookies", function ($scope, $http, $location, $stateParams, $rootScope, $cookies) {

      $scope.getSteps = function () {
          $http({
            method: 'GET',
            url: '/api/steps'
          }).success(function (response) {
              $scope.steps = response;
          });
      };
      $scope.getStep = function () {
          var stepId = $stateParams.id;
          let locationHash = window.location.hash;
          if(locationHash.indexOf('edit') > 0){
            if($rootScope.token){
              $http({
                method: 'GET',
                url: "/api/steps/" + stepId,
                headers: {
                  'Authorization': $rootScope.token
                }
              }).success(function (response) {
                  if(response.userID === $rootScope.userID){
                    $scope.step = response;
                  }else{
                    window.location.href = "#/steps/" + stepId;
                  }
              });
            }else{
              window.location.href = "#/steps/" + stepId;
            }
          }else{
            $http({
              method: 'GET',
              url: "/api/steps/" + stepId
            }).success(function (response) {
                $scope.step = response;
            });
          }
      };
      $scope.addStep = function () {
          $scope.step.create_date = Date.now();
          $http({
            method: 'POST',
            url: '/api/steps',
            headers: {
              'Authorization': $rootScope.token
            },
            data: $scope.step
          }).success(function () {
              window.location.href = "#/";
          });
      };

      $scope.updateStep = function () {
          var stepId = $stateParams.id;
          $http({
            method: 'PUT',
            url: "/api/steps/" + stepId,
            headers: {
              'Authorization': $rootScope.token
            },
            data: $scope.step
          }).success(function () {
              window.location.href = "#/steps/" + stepId;
          });
      };

      $scope.deleteStep = function () {
          var stepID = $stateParams.id;
          let result = confirm("Вы действительно хотите удалить услугу ?");
          if(result){
            $http({
              method: 'DELETE',
              url: "/api/steps/" + stepID,
              headers: {
                'Authorization': $rootScope.token
              },
              data: $scope.step
            }).success(function () {
                window.location.href = "#/";
            });
          }
      };

      $scope.checkMyStep = function(){
          if($scope.step){
            if($cookies.get('username') === $scope.step.username){
              return true;
            }else{
              return false;
            }
          }
      }



  }]);
}
