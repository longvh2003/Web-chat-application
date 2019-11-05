function menuCtrl($rootScope, $scope, $location, $http){
    $rootScope.$on('menu-clicked', ()=>{
        $scope.myButton = !$scope.myButton;
    })
    $scope.menuClicked=index=>{
        if(index==1){    
            $location.path('/friends');
            console.log(index);
        }
        else if(index==3){
            console.log('logout');
            $http({
                method:'GET',
                url:'/logout',
            });
        }
    }

}


angular.module('myApp').component('menu', {
    templateUrl: '/src/component/menu.html',
    controller: menuCtrl
  });