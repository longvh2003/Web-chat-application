

function headerCtrl($rootScope, $scope){
    $scope.clickMenu = ()=>{
        $rootScope.$emit('menu-clicked');
    }

    $rootScope.$on('username', ()=>{
        $scope.username = $rootScope.username;
    })

    $rootScope.$on('notifications', ()=>{
        $scope.notifications = $rootScope.notifications;
    })

}

angular.module('myApp').component('headerChat', {
    templateUrl: '/src/component/headerChat.html',
    controller: headerCtrl
  });
