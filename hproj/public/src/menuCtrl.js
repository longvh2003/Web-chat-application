function menuCtrl($rootScope, $scope, $location, $http, $window){

    $scope.listFriends=[];
    $scope.listInvitation=[];

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
        });
    }

    $scope.addFriendBut=friend=>{
        $http({
            method:'POST',
            url:'/getListInvitation',
            data:{userSend:friend.user_id}
        }).then(res=>{
            console.log('sdfsdkl;gjlsd    '+res);
        });
        $window.location.reload();
    }

    var renderListFriends=()=>{
        $http({
                method:'GET',
                url:'/addFriends',
            }).then(res=>{//res.data chuua res.data[i].chatroom_id
                if(res.data) $scope.listFriends=res.data;
            });
    }
    renderListFriends();
    var renderListInvitation=()=>{
        $http({
            method:'GET',
            url:'/getListInvitation'
        }).then(res=>{
            if(res.data) $scope.listInvitation=res.data;
        });
    }
    renderListInvitation();

}


angular.module('myApp').component('menu', {
    templateUrl: '/src/component/menu.html',
    controller: menuCtrl
  });