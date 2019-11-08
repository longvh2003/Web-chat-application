function menuCtrl($rootScope, $scope, $location, $http, $window){
    $rootScope.$on('menu-clicked', ()=>{
        $scope.myButton = !$scope.myButton;
    })
    $scope.menuClicked=index=>{
        if(index==2){    
            $location.path('/friends');
            console.log(index);
            renderListFriends();
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
        $location.path('/friends');
        console.log($scope.asd);
        $http({
            method:'POST',
            url:'/addFriends',
            data:{username:$scope.asd}
        }).then(res=>{
            console.log(res.data);
            $window.alert(res.data);
        });
        
    }

    var renderListFriends=()=>{

        $http({
                method:'GET',
                url:'addFriends',
            }).then(res=>{//res.data chuua res.data[i].chatroom_id
                $rootScope.listFriends=res.data;
            });
    }

}


angular.module('myApp').component('menu', {
    templateUrl: '/src/component/menu.html',
    controller: menuCtrl
  });