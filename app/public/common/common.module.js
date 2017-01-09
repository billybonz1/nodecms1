import angular from 'angular';
import { SiteHeaderModule } from './siteheader/siteheader.module';

export const CommonModule = angular
    .module('app.common', [
        SiteHeaderModule,
    ])
    .name;