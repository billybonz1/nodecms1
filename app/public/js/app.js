var app = angular.module('OneStep',['ngRoute']);


app.config(function($routeProvider){
    $routeProvider.when('/',{
        controller: 'stepsController',
        templateUrl: 'views/steps.html'
    })
    .when('/addstep',{
        controller: 'stepsController',
        templateUrl: 'views/addstep.html'
    })
    .when('/steps/:id',{
        controller: 'stepsController',
        templateUrl: 'views/detailstep.html'
    })
    .when('/steps/edit/:id',{
        controller: 'stepsController',
        templateUrl: 'views/editstep.html'
    })
    .otherwise({
        redirectTo: '/'
    });
});



