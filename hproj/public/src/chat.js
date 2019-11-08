const socket = io('/home');
console.log(socket);
var userid = null;
var i = 1;
var socketroom1;


/* Khai báo module và controller angularjs cho toàn bộ container
   Có thể thêm controller và directive thích hợp */

var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);
myApp.run(function($rootScope){
    $rootScope.roomsId = [];
    $rootScope.rooms = [];
    $rootScope.tempRoomId = 0;
    $rootScope.username = ' ';
    $rootScope.userid = 0;
})
myApp
    .controller('myCtrl', function($scope, $http, $location, $rootScope, $routeParams){

        /* Khi load trang thì lấy username, id */
        // $scope.init = () =>{
        //     $http.get('/home/username').then((result) => {
        //         if($routeParams.roomid)  $rootScope.tempRoomId=$routeParams.roomid;
        //         console.log( $rootScope.tempRoomId);
        //         $rootScope.username = result.data.userdata.username;
        //         $rootScope.userid = result.data.userdata.userId;
        //         $rootScope.roomId = result.data.chatroom;
        //         for (let j = 0; j < result.data.chatroom.length; j++) {
        //             $rootScope.rooms[j] = result.data.chatroom[j];
        //         }
        //         for (let index = 0; index < $rootScope.roomId.length; index++) {
        //             socket.emit('join', $rootScope.roomId[index].chatroom_id);
        //         }
        //         $rootScope.$emit('username');
        //     })
        // }
    
    
        /* Nhận tin nhắn */
        socket.on('message', (msg) => {
            if(msg.roomid === $rootScope.tempRoomId){
                if(msg.username === $rootScope.username){
                    //console.log(msg);
                    angular.element(".messagePend").append("<p><strong  class='userchat'> " + msg.username +  "</strong>"  + ": " + msg.text + "</p>");
                } else angular.element(".messagePend").append("<p><strong> " + msg.username +  "</strong>"  + ": " + msg.text + "</p>");    
                $(".messagePend").animate({ scrollTop: $(document).height() }, "slow");  
            }
            else {
                angular.element("#" + msg.roomid).addClass('red');
                sessionStorage.setItem("room" + msg.roomid, msg.roomid);
            }
        })
    })

myApp
    .controller('contentController', function ($rootScope, $scope, $location, $http, $routeParams, $mdDialog) {
        if($routeParams){
            $rootScope.tempRoomId = $routeParams.roomid;
        }

        $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
            if(angular.element('.room-hover div')){
                for (let index = 0; index < $rootScope.rooms.length; index++) {
                    if(sessionStorage.getItem("room" + $rootScope.rooms[index].chatroom_id)){
                        angular.element("#" + $rootScope.rooms[index].chatroom_id).addClass('red');
                    }
                }
            }  
        });
          


        $rootScope.$on('menu-clicked', ()=>{
            $scope.myButton = !$scope.myButton;
        })

        $scope.selectedRow = null;
        $scope.panelClick = (index, room) => {
            angular.element('#'+room.chatroom_id).removeClass('red');
            $rootScope.tempRoomId = room.chatroom_id;
            $location.path('/chat/' + room.chatroom_id);
            if($scope.text) $scope.text.remove();
            $scope.selectedRow = index;
            sessionStorage.removeItem("room" + room.chatroom_id);
        }
        if($rootScope.tempRoomId){
            $scope.getHistory($rootScope.tempRoomId);
        }

        $scope.getHistory = (roomid) =>{
            $http.get('/home/messageHis/' + roomid).then((result) => {
                for(i = 0; i< result.data.length; i++){            //Kiểm tra result và thêm tin nhắn cũ
                    if(result.data[i].from_user === $rootScope.username){
                        angular.element(".messagePend").append("<p><strong  class='userchat'> " + result.data[i].from_user +  "</strong>"  + ": " + result.data[i].content + "</p>"); 
                    } else angular.element(".messagePend").append("<p><strong> " + result.data[i].from_user +  "</strong>"  + ": " + result.data[i].content + "</p>");
                }
                angular.element(".messagePend").append("<hr style='margin-bottom: 20px;'></hr>");
            })
            $(".messagePend").animate({ scrollTop: $(document).height() }, "slow");
        }

        $scope.sendmessage = () =>{
            socket.emit('message', {roomid: $rootScope.tempRoomId, text: $scope.message, username: $rootScope.username, id: $rootScope.userid});
            $scope.message = "";
            $("#messagePend").scrollTop = $("#messagePend").scrollHeight - $("#smessagePend").clientHeight;
        }

        $scope.showAdvanced = function(ev) {
            $mdDialog.show({
            controller: DialogController,
            templateUrl: '/src/component/testing.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: false // Only for -xs, -sm breakpoints.
            })
            .then(function(answer, roomname, roompass, roomdes) {
            if(answer === 'Cancel') {
                console.log(roomname);
                $mdDialog.hide();
            }
            }, function() {
            console.log('x');
            });
        };

        function DialogController($scope, $mdDialog, $http, $rootScope) {
            $scope.hide = function() {
                $mdDialog.hide();
            };
        
            $scope.cancel = function() {
                $mdDialog.cancel();
            };
        
            $scope.answer = function(answer) {
                $mdDialog.hide(answer);
            };

            $scope.showAlert = function(status, des) {
                // Appending dialog to document.body to cover sidenav in docs app
                // Modal dialogs should fully cover application
                // to prevent interaction outside of dialog
                $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title(status)
                    .textContent(des)
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
                );
            };


            $scope.submit = () => {
                console.log($scope.newroomname);
                if($scope.newroompassword === undefined) $scope.newroompassword = "";
                if($scope.newroomdes === undefined) $scope.newroomdes = "";
                let data = {name: $scope.newroomname, pass: $scope.newroompassword, des: $scope.newroomdes, userid: $rootScope.userid}
                $http.post('/home/addRoom', JSON.stringify(data)).then((result) =>{
                    console.log(result);
                    if(result.data.status){
                        $scope.showAlert("Tạo phòng thành công", "Tạo thành công!!");
                    } else {
                        $scope.showAlert("Tạo phòng không thành công", "Tên phòng đã tồn tại, vui lòng chọn tên khác");
                        $mdDialog.hide();
                    }
                })
                $scope.$emit('reloadRoom');
                //$mdDialog.hide();
            }    
        }
    })
    .directive('onFinishRender', function ($timeout) {
        return {
          restrict: 'A',
          link: function (scope, element, attr) {
            if (scope.$last === true) {
              $timeout(function () {
                scope.$emit('ngRepeatFinished');
              });
            }
          }
        }
      })
    .directive('roomPanel', ($http, $rootScope, $routeParams)=>{
        return {
            templateUrl: '/src/component/room.html',
            link: function(scope, element, attribute) {
                scope.init = () =>{
                    $http.get('/home/username').then((result) => {
                        if($routeParams.roomid)  $rootScope.tempRoomId=$routeParams.roomid;
                        console.log( $rootScope.tempRoomId);
                        $rootScope.username = result.data.userdata.username;
                        $rootScope.userid = result.data.userdata.userId;
                        $rootScope.roomId = result.data.chatroom;
                        for (let j = 0; j < result.data.chatroom.length; j++) {
                            $rootScope.rooms[j] = result.data.chatroom[j];
                        }
                        for (let index = 0; index < $rootScope.roomId.length; index++) {
                            socket.emit('join', $rootScope.roomId[index].chatroom_id);
                        }
                        $rootScope.$emit('username');
                    })
                }
                scope.init();
                scope.$on('reloadRoom', ()=>{
                    scope.init();
                })

            }
        }
    })





myApp.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/chat/:roomid', {
                templateUrl: '/src/component/chatroom.html',
                controller: 'contentController'
            })
        .when('/friends',{
                templateUrl:'/src/component/searchFriends.html',
                controller: menuCtrl
        })
        
});
