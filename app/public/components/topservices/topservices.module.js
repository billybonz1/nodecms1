import angular from 'angular';
import { TopServicesComponent } from './topservices.component';


export const TopServicesModule = angular
    .module('topservices', [])
    .component('topservices', TopServicesComponent)
    .name;