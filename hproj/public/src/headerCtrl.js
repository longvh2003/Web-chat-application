

function headerCtrl($rootScope, $scope){
    $scope.clickMenu = ()=>{
        $rootScope.$emit('menu-clicked');
    }

    $rootScope.$on('username', ()=>{
        $scope.username = $rootScope.username;
    })
}

angular.module('myApp').component('headerChat', {
    templateUrl: '/src/component/headerChat.html',
    controller: headerCtrl
  });

// var header = angular.module('headerCtrl', []);
// header.controller('headerCtrl', function($rootScope, $scope){
//     $scope.clickMenu = ()=>{
//         $rootScope.$emit('menu-clicked');
//     }
// })