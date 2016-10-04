var app = angular.module('OneStep',['ngRoute']);


// app.config(function($routeProvider){
//     $routeProvider.when('/',{
//         controller: 'stepsController',
//     });
// });


app.controller('stepsController',function($scope){
    $scope.steps  = [
        {
            title: "Я установлю розетку в вашей квартире",
            price: "5",
            currency: "грн.",
            rating: 5,
            img: "./img/img.jpg"
        },
        {
            title: "Я помою Вашу машину",
            price: "1",
            currency: "грн.",
            rating: 1,
            img: "./img/img.jpg"
        },
        {
            title: "Я помою Вашу машину",
            price: "2",
            currency: "грн.",
            rating: 1,
            img: "./img/img.jpg"
        }
    ];
    $scope.newStep = {
        created_at: "",
        title: "",
        price: "",
        currency: "грн.",
        rating: "0",
        img: "./img/img.jpg"
    };
    $scope.addStep = function(){
        $scope.newStep.created_by = Date.now();
        $scope.steps.push($scope.newStep);
        $scope.newStep = {
            created_at: "",
            title: "",
            price: "",
            currency: "грн.",
            rating: "0",
            img: "./img/img.jpg"
        };
    };
});

