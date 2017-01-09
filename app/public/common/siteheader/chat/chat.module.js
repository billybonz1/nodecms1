import angular from 'angular';
import ngCookies from 'angular-cookies';
import { ChatComponent } from './chat.component';
import "./chat.scss";

export const ChatModule = angular
    .module('headerchat', [
        ngCookies
    ])
    .component('headerchat', ChatComponent)
    .name;
