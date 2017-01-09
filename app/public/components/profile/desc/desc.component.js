import template from './desc.html';
import DescController from './desc.controller';


export const DescComponent = {
    restrict: 'E',
    scope: {},
    template,
    controller: DescController,
    controllerAs: "desc",
    bindings: {
      desc: '<',
      myprofile: '<'
    }
};
