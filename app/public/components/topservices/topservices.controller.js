export default class TopServicesController {
  constructor($http, socket) {
    'ngInject';
    this.steps = [];
    this.$http = $http;
    socket.on("afterStepAdded", (data) => {
      console.log(data.step);
      this.steps.push(data.step);
    });
  }

  getSteps(){
    this.$http({
      method: 'GET',
      url: '/api/steps'
    }).success((response) => {
      this.steps = response;
    });
  }
}
