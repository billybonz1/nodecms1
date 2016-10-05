

app.controller('stepsController',['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
    $scope.getSteps = function () {
        $http.get('/api/steps').success(function(response){
            $scope.steps = response;
        });
    };
    $scope.getStep = function () {
        var id = $routeParams.id;
        $http.get('/api/steps/'+id).success(function(response){
            $scope.step = response;
        });
    };
    $scope.addStep = function(){
        $scope.step.create_date = Date.now();
        $http.post('/api/steps/', $scope.step).success(function (response) {
            window.location.href='#/';
        });
    };

    $scope.updateStep = function(){
        var id = $routeParams.id;
        $http.put('/api/steps/'+id, $scope.step).success(function (response) {
            window.location.href='#/steps/'+id;
        });
    };
}]);