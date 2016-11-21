"use strict";
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';
var app = angular.module("OneStep", [uiRouter, ngCookies]);

app.run(["$rootScope", "$cookies" , function($rootScope, $cookies){
    if($cookies.get('token')){
        $rootScope.token = $cookies.get('token');
    }
    if($cookies.get('userID')){
        $rootScope.userID = $cookies.get('userID');
    }
    if($cookies.get('username')){
        $rootScope.username = $cookies.get('username');
        $rootScope.usernameFirstLetter = $rootScope.username[0];
    }
}]);


// app.config(["$locationProvider", function($locationProvider) {
//   $locationProvider.html5Mode(true);
// }]);
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");

    $stateProvider.state("home", {
        url: "/",
        templateUrl: "views/steps.html",
        controller: "stepsController"
    });
    $stateProvider.state("addstep", {
        url: "/addstep",
        controller: "stepsController",
        templateUrl: "views/addstep.html"
    });
    $stateProvider.state("stepsId", {
        url: "/steps/:id",
        controller: "stepsController",
        templateUrl: "views/detailstep.html"
    });
    $stateProvider.state("stepsEditId", {
        url: "/steps/edit/:id",
        controller: "stepsController",
        templateUrl: "views/editstep.html"
    });

    $stateProvider.state("register", {
        url: "/register",
        controller: "registerController",
        templateUrl: "views/register.html"
    });

    $stateProvider.state("login", {
        url: "/login",
        controller: "loginController",
        templateUrl: "views/login.html"
    });


    $stateProvider.state("userProfile", {
        url: "/user/:username",
        controller: "userController",
        templateUrl: "views/user/profile.html"
    });


}]);

import {stepsController} from "../controllers/steps";stepsController(app);

app.component('steps', {
    template: `
      <step ng-repeat="step in $ctrl.steps" step='step'></step>
    `,
    controller: function($http){
        var ctrl = this;
        $http({
          method: 'GET',
          url: '/api/steps'
        }).success(function (response) {
            ctrl.steps = response;
        });
    }
});


app.component('step', {
    template: `
      {{$ctrl.step.label}}
    `,
    bindings: {
      step: '<'
    },
    controller: function(){}
});





import {registerController} from "../controllers/register";registerController(app);
import {loginController} from "../controllers/login";loginController(app);
import {userMenuController} from "../controllers/userMenu";userMenuController(app);
import {userController} from "../controllers/user";userController(app);
