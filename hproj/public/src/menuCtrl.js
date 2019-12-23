function menuCtrl($rootScope, $scope, $location, $http, $window){

    $scope.listFriends=[];
    $scope.listInvitation=[];
    $scope.users = [];

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
        if(index==3){    
            
            $http({
                method:'POST',
                url:'/AuthenticAdmin'
            }).then(res=>{
                if(res.data==true) $location.path('/admin');
                else $window.alert('Bạn không có quyền Admin');
            });
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

    $scope.querySearch = async (query) =>{
        await $http.post('/users').then((res)=>{
            $scope.users = res.data;
        })
        var results = query ? $scope.users.filter(createFilterFor(query)) : $scope.users;
        return results;
    }

    function createFilterFor(query) {
        var lowercaseQuery = query.toLowerCase();
  
        return function filterFn(item) {
          return (item.username.toLowerCase().indexOf(lowercaseQuery) === 0);
        };
  
      }

    $scope.showEl=element=>{
        if($scope.listFriends.length>0) $location.path('/chat/'+element.chatroom_id);
        // console.log('chatroom_id: '+element.chatroom_id);
    }
    $scope.display=()=>{
        $location.path('/friends');
        $http({
            method:'POST',
            url:'/addFriends',
            data:{username:$scope.selectedItem.username}
        }).then(res=>{
            $window.alert(res.data);
        });
        
    }

    $scope.addFriendBut=friend=>{
        $http({
            method:'POST',
            url:'/getListInvitation',
            data:{userSend:friend.user_id}
        });
        $window.location.reload();
        
    }

    $scope.removeInvi = friend=>{
        $http({
            method:'POST',
            url:'/removeInvi',
            data:{userSend:friend.user_id}
        });
        $window.location.reload();   
    }

    var renderListFriends=()=>{
        $http({
                method:'GET',
                url:'/addFriends',
            }).then(res=>{//res.data chuua res.data[i].chatroom_id
                if(res.data) 
                var tempList = res.data;

                tempList.forEach(element=>{
                    $scope.listFriends.push({
                        image:'userAvatar/'+element.user_id+'.jpg',
                        username:element.username,
                        chatroomname:element.chatroomname,
                        chatroom_id:element.chatroom_id
                    });
                });

            });
    }
    renderListFriends();


    var renderListInvitation=()=>{
        $http({
            method:'GET',
            url:'/getListInvitation'
        }).then(res=>{
            if(res.data) var tempList=res.data;
            tempList.forEach(element=>{
                $scope.listInvitation.push({
                    user_id:element.user_id,
                    username:element.username,
                    image:'userAvatar/'+element.user_id+'.jpg',
                    readed:element.readed
                });
            })
            console.log($scope.listInvitation);
        });
    }
    renderListInvitation();

    $scope.unfriend=x=>{
        $http({
            method:'POST',
            url:'/unfriend',
            data:{friend:x}
        });
        $location.path('/friends'); 
        $window.location.reload();
    }

}


angular.module('myApp').component('menu', {
    templateUrl: '/src/component/menu.html',
    controller: menuCtrl
  });