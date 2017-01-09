import template from './step.html';

export const StepComponent = {
  restrict: 'E',
  scope: {},
  template,
  bindings: {
    step: '<'
  }
};
