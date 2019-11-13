function menuCtrl($rootScope, $scope, $location, $http, $window){
    $rootScope.$on('menu-clicked', ()=>{
        $scope.myButton = !$scope.myButton;
    })
    $scope.menuClicked=index=>{
        if(index == 0){
            $location.path('/');
        }
        if(index == 1){
            $location.path('/profile');
        }
        if(index==2){    
            $location.path('/friends');
            renderListFriends();
            renderListInvitation();
        }
        else if(index==4){
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
        $http({
            method:'POST',
            url:'/addFriends',
            data:{username:$scope.asd}
        }).then(res=>{
            $window.alert(res.data);
            renderListFriends();
        });
    }

    $scope.addFriendBut=friend=>{
        console.log(friend);
        console.log('clicked');
        $http({
            method:'POST',
            url:'/getListInvitation',
            data:{userSend:friend.user_id}
        });
        renderListFriends();
        renderListInvitation();
    }

    var renderListFriends=()=>{
        $http({
                method:'GET',
                url:'/addFriends',
            }).then(res=>{//res.data chuua res.data[i].chatroom_id
                $rootScope.listFriends=res.data;
            });
    }

    var renderListInvitation=()=>{
        $http({
            method:'GET',
            url:'/getListInvitation'
        }).then(res=>{
            $rootScope.listInvitation=res.data;
            console.log(res.data);
        });
    }

}


angular.module('myApp').component('menu', {
    templateUrl: '/src/component/menu.html',
    controller: menuCtrl
  });