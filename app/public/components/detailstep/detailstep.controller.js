class DetailStepController {
  constructor($http,$stateParams,$cookies,$rootScope) {
    'ngInject';
    this.getStep = function () {
        var stepId = $stateParams.id;
        if(!stepId){
          window.location.href = "#/";
        }
        let locationHash = window.location.hash;
        $http({
          method: 'GET',
          url: "/api/steps/" + stepId
        }).success((response) => {
          this.step = response;
        });
    };

    this.checkMyStep = function(){
          if(this.step){
              return $cookies.get('username') === this.step.username;
          }
    };

    this.deleteStep = function () {
        var stepID = $stateParams.id;
        let result = confirm("Вы действительно хотите удалить услугу ?");
        if(result){
          $http({
            method: 'DELETE',
            url: "/api/steps/" + stepID,
            headers: {
              'Authorization': $rootScope.token
            },
            data: this.step
          }).success(function () {
              window.location.href = "#/";
          });
        }
    };

  }
}


export default DetailStepController;
