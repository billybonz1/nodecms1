import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';
import { SearchComponent } from './search.component';
import "./search.scss";

export const SearchModule = angular
    .module('search', [
        uiRouter,
        ngCookies
    ])
    .component('search', SearchComponent)
    .name;
