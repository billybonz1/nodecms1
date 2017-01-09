import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';
import { RegisterComponent } from './register.component';


export const RegisterModule = angular
    .module('register', [
        uiRouter,
        ngCookies
    ])
    .component('register', RegisterComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject';
        $stateProvider
            .state('register', {
                url: '/register',
                template: '<register></register>'
            });
    })
    .name;