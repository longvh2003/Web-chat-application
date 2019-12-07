

function headerCtrl($rootScope, $scope,$http){
    $scope.listNote=[];
    $scope.notifications=0;
    $scope.listRoomInvi = [];
    var noti=angular.element('#notifications');
    var notiElem=angular.element('#dropdown-content');
    var checked=0;//biến kiểm tra
    $scope.displayNoti=()=>{
        
        if(checked===0){
            updateInvi();
            getRoomInvite();
            $scope.notifications=0;//đọc xong rồi
            notiElem.attr('style','display:block');
            checked++;
        }else{
            notiElem.attr('style','display:none');
            checked = 0;
        }
        
    }

    $scope.clickMenu = ()=>{
        $rootScope.$emit('menu-clicked');
    }

    $rootScope.$on('username', ()=>{
        $scope.username = $rootScope.username;
    })

    $rootScope.$on('notifications', ()=>{
        $scope.notifications = $rootScope.notifications;
    });

    // var getNot=function(){
        $http({
            method:'GET',
            url:'/getListInvitation'
        }).then(res=>{
            if(res.data){
                var list=res.data;
                for(var i=0;i<list.length;i++){
                    if(!list[i].readed){
                        $scope.listNote.push({
                            mess:'Có 1 lời mời kết bạn từ: ',
                            username:list[i].username
                        });
                    }
                }
                $scope.notifications+=$scope.listNote.length;
            }
        });
    // }
    var updateInvi=()=>{
        $http({
            method:'POST',
            url:'/updateinvi'
        })
    }

    var getRoomInvite = ()=>{
        $http.post('/loadRoomNotifi/' + $rootScope.userid).then((res)=>{
            res.data.result.forEach(element => {
                $scope.listRoomInvi = [];
                $scope.listRoomInvi.push(element);
            });
        })
    }

    $scope.acceptRoom = (notification,me)=>{
        $http.post('/acceptRoom', JSON.stringify(notification)).then((res)=>{
            angular.element(me).prop('disabled', true);
            $rootScope.$broadcast('reloadRoom');
        })
    }

}

angular.module('myApp')
    .component('headerChat', {
        templateUrl: '/src/component/headerChat.html',
        controller: headerCtrl
    });
