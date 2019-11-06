function menuCtrl($rootScope, $scope, $location, $http, $window){
    $rootScope.$on('menu-clicked', ()=>{
        $scope.myButton = !$scope.myButton;
    })
    $scope.menuClicked=index=>{
        if(index==2){    
            $location.path('/friends');
            console.log(index);
        }
        else if(index==4){
            console.log('logout');
            $http({
                method:'GET',
                url:'/logout',
            }).then((res)=>{
                $window.location.href = '/'
            });
        }
    }
    $scope.display=()=>{
        $window.location.reload();
    }

}


angular.module('myApp').component('menu', {
    templateUrl: '/src/component/menu.html',
    controller: menuCtrl
  });