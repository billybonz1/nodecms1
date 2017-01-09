import template from './login.html';
import controller from './login.controller';

export const LoginComponent = {
  restrict: 'E',
  scope: {},
  template,
  controller,
  controllerAs: 'login',
  bindToController: true
};
