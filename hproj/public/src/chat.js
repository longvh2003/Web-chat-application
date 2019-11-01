const socket = io('/home');
console.log(socket);
var userid = null;
var i = 1;
var socketroom1;


/* Khai báo module và controller angularjs cho toàn bộ container
   Có thể thêm controller và directive thích hợp */

var myApp = angular.module('myApp', ['ngRoute']);
myApp.controller('myCtrl', function($scope, $http, $location){

    $scope.sendmessage = () =>{
        console.log("button pressed");
        console.log(socketroom1);
        socketroom1.emit('message', {text: $scope.message, username: $scope.username, id: userid});
        $scope.message = "";
    }
    // $scope.getHistory = () =>{
    //     $http.get('/home/messageHis').then((result) => {
    //         for(i = 0; i< result.data.length; i++){            //Kiểm tra result và thêm tin nhắn cũ
    //             if(result.data[i].from_user === $scope.username){
    //                 console.log("conkec");
    //                 angular.element(".messagePend").append("<p><strong  class='userchat'> " + result.data[i].from_user +  "</strong>"  + ": " + result.data[i].content + "</p>"); 
    //             } else angular.element(".messagePend").append("<p><strong> " + result.data[i].from_user +  "</strong>"  + ": " + result.data[i].content + "</p>");
    //         }
    //     })
    //     $(".messagePend").animate({ scrollTop: $(document).height() }, "slow");
    // }

    if(socketroom1){
        socketroom1.on('message' , (msg) => {
            console.log("recevied");
            //angular.element(".messagePend").append("<p><strong  class='userchat'> " + msg.username +  "</strong>"  + ": " + msg.text + "</p>");
            if(msg.username === $scope.username){
                console.log("concac ");
                angular.element(".messagePend").append("<p><strong  class='userchat'> " + msg.username +  "</strong>"  + ": " + msg.text + "</p>");
            } else angular.element(".messagePend").append("<p><strong> " + msg.username +  "</strong>"  + ": " + msg.text + "</p>");
        })
    }


    // $scope.selectedRow = null;
    // $scope.panelClick = (index) => {
    //     $scope.selectedRow = index;
    //     $location.path('' + parseInt(index + 1));
    //     socketroom1 = io('/home/1');
    // }


    $scope.menuClicked=index=>{
        if(index==1){    
            $location.path('/friends');
            console.log(index);
        }
        else if(index==3){
            $location.path('/logout');
        }
    }


    /* Khi load trang thì lấy username, id */
    $scope.init = () =>{
        $http.get('/home/username').then((result) => {
            $scope.username = result.data.username;
            userid = result.data.userId;
        })
    }

    /* Nhận emit message từ server-side và thêm tin nhắn mới */
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

myApp.controller('contentController', ($rootScope, $scope)=> {
    $rootScope.$on('menu-clicked', ()=>{
        $scope.myButton = !$scope.myButton;
    })

    $scope.selectedRow = null;
    $scope.panelClick = (index) => {
        $scope.selectedRow = index;
        $location.path('' + parseInt(index + 1));
        socketroom1 = io('/home/:roomid');
        $scope.getHistory();
    }

    $scope.getHistory = () =>{
        $http.get('/home/messageHis/' + ($scope.selectedRow + 1)).then((result) => {
            for(i = 0; i< result.data.length; i++){            //Kiểm tra result và thêm tin nhắn cũ
                if(result.data[i].from_user === $scope.username){
                    console.log("conkec");
                    angular.element(".messagePend").append("<p><strong  class='userchat'> " + result.data[i].from_user +  "</strong>"  + ": " + result.data[i].content + "</p>"); 
                } else angular.element(".messagePend").append("<p><strong> " + result.data[i].from_user +  "</strong>"  + ": " + result.data[i].content + "</p>");
            }
        })
        $(".messagePend").animate({ scrollTop: $(document).height() }, "slow");
    }


    // socket.on('message' , (msg) => {
    //     angular.element(".messagePend").append("<p><strong  class='userchat'> " + msg.username +  "</strong>"  + ": " + msg.text + "</p>");
    //     // if(msg.username === $scope.username){
    //     //     console.log("concac ");
    //     //     angular.element(".messagePend").append("<p><strong  class='userchat'> " + msg.username +  "</strong>"  + ": " + msg.text + "</p>");
    //     // } else angular.element(".messagePend").append("<p><strong> " + msg.username +  "</strong>"  + ": " + msg.text + "</p>");
    // })

})
myApp.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        // .when('/:roomid', {
        //     templateUrl: '/src/chatroom.html',
        //     controller: 'myCtrl'
        // })
        .when('/friends',{
            templateUrl:'/src/searchFriends.html'
        })
        
});





