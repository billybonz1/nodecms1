class UserStepsController {
    constructor($http,$rootScope,$stateParams){
        'ngInject';
        this.$http = $http;
        this.$stateParams = $stateParams;
    }

    getSteps(){
      this.$http({
        method: 'GET',
        url: '/api/user/' + this.$stateParams.username + "/steps"
      }).success((response) => {
        this.steps = response;
      });
    }
}

export default UserStepsController;
