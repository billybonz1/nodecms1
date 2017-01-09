import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';
import { DetailStepComponent } from './detailstep.component';


export const DetailStepModule = angular
    .module('detailstep', [
        uiRouter,
        ngCookies
    ])
    .component('detailstep', DetailStepComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject';
        $stateProvider
            .state('detailstep', {
                url: '/steps/:id',
                template: '<detailstep></detailstep>'
            });
    })
    .name;
