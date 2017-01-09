import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';
import ngFileUpload from 'ng-file-upload';
import focusIf from 'ng-focus-if';


import "./profile.scss";

import { ProfileComponent } from './profile.component';
import { SkillsModule }  from './skills/skills.module.js';
import { DescModule }  from './desc/desc.module.js';
import { UserStepsModule }  from './usersteps/usersteps.module.js';

export const ProfileModule = angular
    .module('profile', [
        uiRouter,
        ngCookies,
        ngFileUpload,
        focusIf,
        SkillsModule,
        DescModule,
        UserStepsModule
    ])
    .component('profile', ProfileComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject';
        $stateProvider
            .state('profile', {
                url: '/user/:username',
                template: '<profile></profile>'
            });
    })
    .name;
