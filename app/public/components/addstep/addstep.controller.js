class AddStepController {
  constructor($http,$rootScope,socket) {
    'ngInject';

    if(!$rootScope.token){
      window.location.href = "#/";
    }


    this.addStep = function () {
        this.step.create_date = Date.now();
        $http({
          method: 'POST',
          url: '/api/steps',
          headers: {
            'Authorization': $rootScope.token
          },
          data: this.step
        }).success(() => {
            window.location.href = "#/";
            console.log(this.step);
            socket.emit('stepAdded', this.step);
        });
    };
  }
}

export default AddStepController;
