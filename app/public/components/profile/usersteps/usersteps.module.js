import angular from 'angular';


import { UserStepsComponent } from './usersteps.component';
import "./usersteps.scss";

export const UserStepsModule = angular
    .module('usersteps', [
    ])
    .component('usersteps', UserStepsComponent)
    .name;
