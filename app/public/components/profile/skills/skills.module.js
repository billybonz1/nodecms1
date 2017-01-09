import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';
import focusIf from 'ng-focus-if';


import { SkillsComponent } from './skills.component';
import "./skills.scss";

export const SkillsModule = angular
    .module('skills', [
        uiRouter,
        ngCookies,
        focusIf
    ])
    .component('skills', SkillsComponent)
    .name;
