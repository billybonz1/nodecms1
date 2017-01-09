import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { AddStepComponent } from './addstep.component';


export const AddStepModule = angular
    .module('addstep', [
        uiRouter
    ])
    .component('addstep', AddStepComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject';
        $stateProvider
            .state('addstep', {
                url: '/addstep',
                template: '<addstep></addstep>'
            });
        $stateProvider
            .state('addstepOverview', {
                url: '/addstep/overview',
                template: 'overview'
            });

    })
    .name;