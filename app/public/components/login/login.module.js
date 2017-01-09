import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';
import { LoginComponent } from './login.component';


export const LoginModule = angular
    .module('login', [
        uiRouter,
        ngCookies
    ])
    .component('login', LoginComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject';
        $stateProvider
            .state('login', {
                url: '/login',
                template: '<login></login>'
            });
    })
    .name;