import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';
import focusIf from 'ng-focus-if';


import { DescComponent } from './desc.component';
import "./desc.scss";

export const DescModule = angular
    .module('desc', [
        uiRouter,
        ngCookies,
        focusIf
    ])
    .component('desc', DescComponent)
    .name;
