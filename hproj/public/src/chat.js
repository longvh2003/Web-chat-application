const socket = io('/home');
//console.log(socket);
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
    $rootScope.tempRoomName = '';
    $rootScope.loadedHistory = 0;
    $rootScope.reloadCount = 0;
})
myApp
    .controller('myCtrl', function($scope, $http, $location, $rootScope, $routeParams, $route){

        /* Khi load trang thì lấy username, id */
        $scope.init = () =>{
            $http.get('/home/username').then((result) => {
                console.log(2);
                $rootScope.username = result.data.userdata.username;
                $rootScope.userid = result.data.userdata.userId;
                $rootScope.roomId = result.data.chatroom;
                // for (let index = 0; index < $rootScope.roomId.length; index++) {
                //     socket.emit('join', $rootScope.roomId[index].chatroom_id);
                // }
                $rootScope.roomId.forEach(element => {
                    socket.emit('join', element.chatroom_id);
                });
                for (let j = 0; j < result.data.chatroom.length; j++) {
                    $rootScope.rooms[j] = result.data.chatroom[j];
                    $rootScope.rooms[j].member = 0;
                    if($rootScope.tempRoomId == result.data.chatroom[j].chatroom_id && $routeParams.roomid) $rootScope.tempRoomName = $rootScope.rooms[j].chatroom_name;
                }    
                //console.log($rootScope.rooms);
                $rootScope.$broadcast('username');
                $rootScope.$broadcast('loadRoom');
            })
            $rootScope.loadedHistory = 0;
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
            $rootScope.loadedHistory++;
            $(".messagePend").animate({ scrollTop: $(document).height() }, "slow");
        }

        $scope.routeReload = ()=>{
            // $rootScope.reloadCount++;
            // if($rootScope.reloadCount === 1){
            //     $rootScope.loadedHistory = 0;
            // }
            //$rootScope.loadedHistory = 0;
            //$route.reload();
        }
    
    
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
        socket.on('usernumber', (clients, roomid)=>{
            $rootScope.rooms.forEach(element => {
                if(element.chatroom_id === roomid) element.member = clients.length;       
            });
            $scope.routeReload();
        })
    })

myApp
    .controller('contentController', function ($rootScope, $scope, $location, $http, $routeParams, $mdDialog, $route) {
        // if($routeParams){
        //     $rootScope.tempRoomId = $routeParams.roomid;
        //     for(let i = 0; i < $rootScope.rooms.length; i++){
        //         if($rootScope.tempRoomId === $rootScope.rooms[i].chatroom_id) {
        //             $rootScope.tempRoomName = $rootScope.rooms[i].chatroom_name;
        //             console.log($rootScope.tempRoomName);
        //         }
        //     }
        // }


        $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
            if(angular.element('.room-hover div')){
                for (let index = 0; index < $rootScope.rooms.length; index++) {
                    if(sessionStorage.getItem("room" + $rootScope.rooms[index].chatroom_id)){
                        angular.element("#" + $rootScope.rooms[index].chatroom_id).addClass('red');
                    }
                }
            }  
        });

        
        $rootScope.$on('loadRoom', ()=>{
            $scope.roominit = ()=>{
                if($routeParams.roomid && $rootScope.loadedHistory ===0) {
                    console.log(1);
                    $rootScope.tempRoomId=$routeParams.roomid;
                    $rootScope.rooms.forEach(element => {
                        if(element.chatroom_id == $rootScope.tempRoomId) $rootScope.tempRoomName = element.chatroom_name;
                    });
                    $scope.getHistory($rootScope.tempRoomId);
                }
            }    
        })

        $rootScope.$on('reloadRoom', ()=>{
            $route.reload();
        })

        $rootScope.$on('menu-clicked', ()=>{
            $scope.myButton = !$scope.myButton;
        })

        $scope.selectedRow = null;
        $scope.panelClick = (index, room) => {
            $rootScope.loadedHistory = 0;
            angular.element('#'+room.chatroom_id).removeClass('red');
            // $rootScope.tempRoomId = room.chatroom_id;
            // $rootScope.tempRoomName = room.chatroom_name;
            $location.path('/chat/' + room.chatroom_id);
            if($scope.text) $scope.text.remove();
            $scope.selectedRow = index;
            //$scope.getHistory($rootScope.tempRoomId);
            sessionStorage.removeItem("room" + room.chatroom_id);
        }


        //$rootScope.$on('loadHistory', $scope.getHistory($rootScope.tempRoomId));

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
                //console.log(roomname);
                $mdDialog.hide();
            }
            }, function() {
            //console.log('x');
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
                //console.log($scope.newroomname);
                if($scope.newroompassword === undefined) $scope.newroompassword = "";
                if($scope.newroomdes === undefined) $scope.newroomdes = "";
                let data = {name: $scope.newroomname, pass: $scope.newroompassword, des: $scope.newroomdes, userid: $rootScope.userid}
                $http.post('/home/addRoom', JSON.stringify(data)).then((result) =>{
                    //console.log(result);
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
        }
    })





myApp.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/', {
            templateUrl: '/src/component/roomrender.html',
            controller: 'contentController'
        })
        .when('/chat/:roomid', {
            templateUrl: '/src/component/chatroom.html',
            controller: 'contentController'
            })
        .when('/friends',{
            templateUrl:'/src/component/searchFriends.html',
            controller: menuCtrl
        })
        
});
