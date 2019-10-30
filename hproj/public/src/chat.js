var socket = io.connect("http://localhost:3000");
var userid = null;



/* Khai báo module và controller angularjs cho toàn bộ container
   Có thể thêm controller và directive thích hợp */

var myApp = angular.module('myApp', ['ngRoute']);
myApp.controller('myCtrl', function($scope, $http, $location){
    $scope.sendmessage = () =>{
        socket.emit('message', {text: $scope.message, username: $scope.username, id: userid});
        $scope.message = "";
    }

    $scope.$on('$locationChangeStart', function(event) {
        $http.get('/home/messageHis').then((result) => {
            //console.log(result.data);
            for(i = 0; i< result.data.length; i++){            //Kiểm tra result và thêm tin nhắn cũ
                //console.log(result.data[i]);
                console.log(result.data[i].from_user + " " + $scope.username);
                if(result.data[i].from_user === $scope.username){
                    angular.element(".message").append("<p><strong  class='userchat'> " + result.data[i].from_user +  "</strong>"  + ": " + result.data[i].content + "</p>"); 
                } else angular.element(".message").append("<p><strong> " + result.data[i].from_user +  "</strong>"  + ": " + result.data[i].content + "</p>");
                console.log(angular.element(".message"));
            }
        })
        $(".message").animate({ scrollTop: $(document).height() }, "slow");
    });
    $scope.selectedRow = null;
    $scope.panelClick = (index) => {
        $scope.selectedRow = index;
        $location.path('' + parseInt(index + 1));
    }


    /* Khi load trang thì lấy username, id và lịch sử tin nhắn từ session qua ajax request */
    $scope.init = () =>{
        $http.get('/home/username').then((result) => {
            $scope.username = result.data.username;
            userid = result.data.userId;
//            console.log(result.data);
        })
    }

    /* Nhận emit message từ server-side và thêm tin nhắn mới */
    socket.on('message' , (msg) => {
        if(msg.username === $scope.username){
            angular.element(".message").append("<p><strong  class='userchat'> " + msg.username +  "</strong>"  + ": " + msg.text + "</p>");
        } else angular.element(".message").append("<p><strong> " + msg.username +  "</strong>"  + ": " + msg.text + "</p>");
    })
})

myApp.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when('/1', {
            templateUrl: '/src/chatroom.html',
        })
		.when('/2', {
			template: '<h1>TESING</h1>',
        })
});





