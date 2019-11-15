

function headerCtrl($rootScope, $scope,$http){
    $scope.listNote=[];
    // getNot();
    var noti=angular.element('#notifications');
    var notiElem=angular.element('#dropdown-content');
    var checked=0;//biến kiểm tra
    $scope.displayNoti=()=>{
        if(checked%2==0){
            notiElem.attr('style','display:block');
        }else{
            notiElem.attr('style','display:none');
        }
        checked++;
        updateInvi();
        $scope.notifications=0;//đọc xong rồi
        // $scope.listNote=[];
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
                        $scope.notifications++;
                    }
                }
            }
        });
    // }
    var updateInvi=()=>{
        $http({
            method:'POST',
            url:'/updateinvi'
        });
    }

}

angular.module('myApp')
    .component('headerChat', {
        templateUrl: '/src/component/headerChat.html',
        controller: headerCtrl
    });
