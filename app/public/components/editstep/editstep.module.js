import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';
import { EditStepComponent } from './editstep.component';


export const EditStepModule = angular
    .module('editstep', [
        uiRouter,
        ngCookies
    ])
    .component('editstep', EditStepComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject';
        $stateProvider
            .state('editstep', {
                url: '/steps/edit/:id',
                template: '<editstep></editstep>'
            });
    })
    .name;