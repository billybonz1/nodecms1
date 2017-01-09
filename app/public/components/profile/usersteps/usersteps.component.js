import template from './usersteps.html';
import UserStepsController from './usersteps.controller';


export const UserStepsComponent = {
    restrict: 'E',
    scope: {},
    template,
    controller: UserStepsController,
    controllerAs: "usersteps",
    bindings: {
      myprofile: "<"
    }
};
