// app.module.js
import "./scss/main.scss";
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { CommonModule } from './common/common.module';


export const AppModule = angular
    .module('OneStep', [
        ComponentsModule,
        CommonModule,
        uiRouter
    ]).factory('socket', ["$rootScope",function ($rootScope) {
        var socket = io.connect();
        return {
          on: function (eventName, callback) {
            socket.on(eventName, function () {
              var args = arguments;
              $rootScope.$apply(function () {
                callback.apply(socket, args);
              });
            });
          },
          emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
              var args = arguments;
              $rootScope.$apply(function () {
                if (callback) {
                  callback.apply(socket, args);
                }
              });
            })
          }
        };
}]).run(["$http", "$rootScope", "$cookies" , function($http, $rootScope, $cookies){
        if($cookies.get('token')){
            $rootScope.token = $cookies.get('token');
            if($cookies.get('userID')){
                $rootScope.userID = $cookies.get('userID');
            }
            if($cookies.get('username')){
                $rootScope.username = $cookies.get('username');
                $rootScope.usernameFirstLetter = $rootScope.username[0];
            }
            $http({
              method: 'GET',
              url: "/api/dashboard/",
              headers: {
                'Authorization': $rootScope.token
              }
            }).success((response) => {

            }).error(() => {
              $cookies.put('token', undefined);
              $cookies.put('userID', undefined);
              $cookies.put('username', undefined);
              $cookies.put('avatar', undefined);
            });
        }
    }])
    .component('app', AppComponent)
    .name;
