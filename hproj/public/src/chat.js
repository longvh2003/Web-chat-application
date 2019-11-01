const socket = io('/home');
console.log(socket);
var userid = null;
var i = 1;
var socketroom1;


/* Khai báo module và controller angularjs cho toàn bộ container
   Có thể thêm controller và directive thích hợp */

var myApp = angular.module('myApp', ['ngRoute']);
myApp.run(function($rootScope){
    $rootScope.rooms = [];
    $rootScope.tempRoomId = 0;
    $rootScope.username = ' ';
    $rootScope.userid = 0;
})
myApp.controller('myCtrl', function($scope, $http, $location, $rootScope, $routeParams){

        /* Khi load trang thì lấy username, id */
        $scope.init = () =>{
            console.log(socket);
            $http.get('/home/username').then((result) => {
                //if($routeParams.roomid)  $rootScope.tempRoomId=$routeParams.roomid;
                console.log( $rootScope.tempRoomId);
                $rootScope.username = result.data.userdata.username;
                $rootScope.userid = result.data.userdata.userId;
                for (let j = 0; j < result.data.chatroom.length; j++) {
                    $rootScope.rooms[j] = result.data.chatroom[j];
                }
            })
        }
    
    /* Nhận tin nhắn */
    socket.on('message', (msg) => {
        if(msg.username === $rootScope.username){
            angular.element(".messagePend").append("<p><strong  class='userchat'> " + msg.username +  "</strong>"  + ": " + msg.text + "</p>");
        } else angular.element(".messagePend").append("<p><strong> " + msg.username +  "</strong>"  + ": " + msg.text + "</p>");
    })




    // $scope.menuClicked=index=>{
    //     if(index==1){    
    //         $location.path('/friends');
    //         console.log(index);
    //     }
    //     else if(index==3){
    //         $location.path('/logout');
    //     }
    // }
})

myApp.controller('headerCtrl', function($rootScope, $scope){
    $scope.clickMenu = ()=>{
        $rootScope.$emit('menu-clicked');
    }
})

myApp.controller('menuController', function($rootScope, $scope){
    $rootScope.$on('menu-clicked', ()=>{
        $scope.myButton = !$scope.myButton;
    })
})

myApp.controller('contentController', function ($rootScope, $scope, $location, $http, $routeParams) {
    if($routeParams){
        $rootScope.tempRoomId = $routeParams.roomid;
    }

    $rootScope.$on('menu-clicked', ()=>{
        $scope.myButton = !$scope.myButton;
    })

    $scope.selectedRow = null;
    $scope.panelClick = (index, room) => {
        $rootScope.tempRoomId = room.chatroom_id;
        $location.path('' + room.chatroom_id);
        if($scope.text) $scope.text.remove();
        $scope.selectedRow = index;
        socket.emit('join', $rootScope.tempRoomId);
    }
    if($rootScope.tempRoomId){
        socket.emit('join', $rootScope.tempRoomId);
        $scope.getHistory($rootScope.tempRoomId);
    }

    $scope.getHistory = (roomid) =>{
        $http.get('/home/messageHis/' + roomid).then((result) => {
            for(i = 0; i< result.data.length; i++){            //Kiểm tra result và thêm tin nhắn cũ
                if(result.data[i].from_user === $rootScope.username){
                    angular.element(".messagePend").append("<p><strong  class='userchat'> " + result.data[i].from_user +  "</strong>"  + ": " + result.data[i].content + "</p>"); 
                } else angular.element(".messagePend").append("<p><strong> " + result.data[i].from_user +  "</strong>"  + ": " + result.data[i].content + "</p>");
            }
        })
        $(".messagePend").animate({ scrollTop: $(document).height() }, "slow");
    }

    $scope.sendmessage = () =>{
        socket.emit('message', {roomid: $rootScope.tempRoomId, text: $scope.message, username: $rootScope.username, id: $rootScope.userid});
        $scope.message = "";
        $("#messagePend").scrollTop = $("#messagePend").scrollHeight - $("#smessagePend").clientHeight;
    }

})


myApp.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/:roomid', {
            templateUrl: '/src/chatroom.html',
            controller: 'contentController'
        })
        .when('/friends',{
                templateUrl:'/src/searchFriends.html',
                controller: 'contentController'
            })
        
});





