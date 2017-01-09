import template from './home.html';
import controller from './home.controller';

export const HomeComponent = {
  restrict: 'E',
  scope: {},
  template,
  controller,
  controllerAs: 'home',
  bindToController: true
};

