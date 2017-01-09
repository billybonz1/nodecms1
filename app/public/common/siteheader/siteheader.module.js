import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';
import { SiteHeaderComponent } from './siteheader.component';
import { SearchModule } from './search/search.module';
import { ChatModule } from './chat/chat.module';
import "./siteheader.scss";

export const SiteHeaderModule = angular
    .module('siteheader', [
        uiRouter,
        ngCookies,
        SearchModule,
        ChatModule
    ])
    .component('siteheader', SiteHeaderComponent)
    .name;
