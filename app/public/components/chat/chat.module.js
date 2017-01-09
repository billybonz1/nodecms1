import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';
import { ChatComponent } from './chat.component';
import "./chat.scss";

export const ChatModule = angular
    .module('chat', [
        uiRouter,
        ngCookies
    ])
    .component('chat', ChatComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject';
        $stateProvider
            .state('chat', {
                url: '/chat/:username',
                template: '<chat></chat>'
            });
    })
    .name;
