

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
