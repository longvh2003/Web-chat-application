function menuCtrl($rootScope, $scope, $location, $http, $window){
    // $scope.listFriends=[1,2,3,4,5,6,7,8,9,10];

    $rootScope.$on('menu-clicked', ()=>{
        $scope.myButton = !$scope.myButton;
    })
    $scope.menuClicked=index=>{
        if(index==2){    
            $location.path('/friends');
            console.log(index);
            $http({
                method:'GET',
                url:'addFriends',
            }).then(res=>{//res.data chuua res.data[i].chatroom_id
                $rootScope.listFriends=res.data;
            });
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
    $scope.showEl=element=>{
        console.log(element);
        $location.path('/chat/'+element.chatroom_id);
    }
    $scope.display=()=>{
        console.log($scope.asd);
        $http({
            method:'POST',
            url:'/addFriends',
            data:{username:$scope.asd}
        });
        $window.location.reload();
    }

}


angular.module('myApp').component('menu', {
    templateUrl: '/src/component/menu.html',
    controller: menuCtrl
  });