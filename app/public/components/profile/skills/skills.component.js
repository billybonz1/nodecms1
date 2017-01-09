import template from './skills.html';
import SkillsController from './skills.controller';


export const SkillsComponent = {
    restrict: 'E',
    scope: {},
    template,
    controller: SkillsController,
    controllerAs: "skills",
    bindings: {
      skills: '<',
      myprofile: '<'
    }
};
