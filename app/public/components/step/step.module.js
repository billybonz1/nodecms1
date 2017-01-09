import angular from 'angular';
import { StepComponent } from './step.component';

export const StepModule = angular
    .module('step', [])
    .component('step', StepComponent)
    .name;