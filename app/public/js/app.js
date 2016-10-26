"use strict";

module.exports = function (angular) {
    var app = angular.module("OneStep", ["ui.router"]);


    app.config(function ($stateProvider, $urlRouterProvider){

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
        $stateProvider.state("taras", {
            url: "/taras",
            controller: "stepsController",
            templateUrl: "views/taras.html"
        });
    });


    app.controller("stepsController", ["$scope", "$http", "$location", "$stateParams", function ($scope, $http, $location, $stateParams){


        $scope.getSteps = function () {
            $http.get("/api/steps").success(function(response){
                $scope.steps = response;
            });
        };
        $scope.getStep = function () {
            var id = $stateParams.id;
            $http.get("/api/steps/" + id).success(function(response){
                $scope.step = response;
            });
        };
        $scope.addStep = function () {
            $scope.step.create_date = Date.now();
            $http.post("/api/steps/", $scope.step).success(function () {
                window.location.href = "#/";
            });
        };

        $scope.updateStep = function () {
            var id = $stateParams.id;
            $http.put("/api/steps/" + id, $scope.step).success(function () {
                window.location.href = "#/steps/" + id;
            });
        };
    }]);
};




