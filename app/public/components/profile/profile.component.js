import template from './profile.html';
import ProfileController from './profile.controller';


export const ProfileComponent = {
    restrict: 'E',
    scope: {},
    template,
    controller: ProfileController,
    controllerAs: "profile"
};
