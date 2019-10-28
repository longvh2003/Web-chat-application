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
    }
    socket.on('message' , (msg) => {
        if(msg.username === $scope.username){
            angular.element(".message").append("<p><strong  class='userchat'> " + msg.username +  "</strong>"  + ": " + msg.text + "</p>");
        } else angular.element(".message").append("<p><strong> " + msg.username +  "</strong>"  + ": " + msg.text + "</p>");
    })
})



