class editstepController {
  constructor($http,$stateParams,$cookies,$rootScope) {
    'ngInject';
    this.getStep = function () {
          var stepId = $stateParams.id;
          if($rootScope.token){
            $http({
              method: 'GET',
              url: "/api/steps/" + stepId,
              headers: {
                'Authorization': $rootScope.token
              }
            }).success((response) => {
                if(response.userID === $rootScope.userID){
                  this.step = response;
                }else{
                  window.location.href = "#/steps/" + stepId;
                }
            });
          }else{
            window.location.href = "#/steps/" + stepId;
          }
    };

    this.updateStep = function () {
        var stepId = $stateParams.id;
        $http({
          method: 'PUT',
          url: "/api/steps/" + stepId,
          headers: {
            'Authorization': $rootScope.token
          },
          data: this.step
        }).success(() => {
            window.location.href = "#/steps/" + stepId;
        });
    };

  }
}
export default editstepController;
