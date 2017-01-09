import template from './topservices.html';
import TopServicesController from './topservices.controller';

export const TopServicesComponent = {
  restrict: 'E',
  scope: {},
  template: template,
  controller: TopServicesController,
  controllerAs: 'topservices',
  bindToController: true
};
