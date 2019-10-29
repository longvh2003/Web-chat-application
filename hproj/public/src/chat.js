

var socket = io.connect("http://localhost:3000");
var userid = null;

angular.module('myApp', [])
.controller('myCtrl', function($scope, $http, $window){
    $scope.sendmessage = () =>{
        // angular.element(".message").append("<p>" + $scope.message + "</p>");
        socket.emit('message', {text: $scope.message, username: $scope.username, id: userid});
        $scope.message = "";
    }
    $scope.init = () =>{
        $http.get('/home/username').then((result) => {
            $scope.username = result.data.username;
            userid = result.data.userId;
            console.log(result.data);
        })
        $http.get('/home/messageHis').then((result) => {
            console.log(result.data);
            for(i = 0; i< result.data.length; i++){
                console.log(result.data[i]);
                if(result.data[i].from_user === $scope.username){
                    angular.element(".message").append("<p><strong  class='userchat'> " + result.data[i].from_user +  "</strong>"  + ": " + result.data[i].content + "</p>");
                } else angular.element(".message").append("<p><strong> " + result.data[i].from_user +  "</strong>"  + ": " + result.data[i].content + "</p>");

            }
        })
    }
    socket.on('message' , (msg) => {
        if(msg.username === $scope.username){
            angular.element(".message").append("<p><strong  class='userchat'> " + msg.username +  "</strong>"  + ": " + msg.text + "</p>");
        } else angular.element(".message").append("<p><strong> " + msg.username +  "</strong>"  + ": " + msg.text + "</p>");
    })
})



