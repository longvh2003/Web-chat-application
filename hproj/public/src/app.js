var app = angular.module('myApp', []);

app.controller('myController', myController);

// app.config(function ($qProvider) {
//     $qProvider.errorOnUnhandledRejections(false);
// });

/* File này không hoặc chưa dùng đến
 */

function myController($scope, $http){
    $scope.username = "";
    $scope.password = "";

    $scope.validate = function(){
        $http.post('/api/valiatePassword/username/' + $scope.username + '/password/' + $scope.password).then(function(result){
            console.log(result.data);
            window.location = result.data;
        })
    }
}