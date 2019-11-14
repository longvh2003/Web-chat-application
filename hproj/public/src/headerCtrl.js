

function headerCtrl($rootScope, $scope){
    $scope.listNote=['username: Message','Note 2','Note 3','Note 4','Note 5','Note 6'];
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
        $scope.notifications=0;//đọc xong rồi
    }
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
