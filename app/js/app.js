var app = angular.module('OneStep',[]);

app.controller('servicesController',function($scope){
    $scope.services  = [
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
    $scope.newService = {
        created_at: "",
        title: "",
        price: "",
        currency: "грн.",
        rating: "0",
        img: "./img/img.jpg"
    };
    $scope.addService = function(){
        $scope.newService.created_by = Date.now();
        $scope.services.push($scope.newService);
        $scope.newService = {
            created_at: "",
            title: "",
            price: "",
            currency: "грн.",
            rating: "0",
            img: "./img/img.jpg"
        };
    };
});

