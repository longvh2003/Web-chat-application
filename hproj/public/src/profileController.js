function ProfileCtrl($scope, $rootScope,$http,$window){
    $rootScope.$on('username', ()=>{
        $scope.username = $rootScope.username;
    })

    $scope.password = 'sample';
    $scope.hidePassword = true;
    $scope.myDate = new Date();
    $http({
            method:'GET',
            url:'/getUserSession'
        }).then(res=>{
        console.log("le trung kien"+res.data.user.userId);
        // document.getElementById("myImage").setAttribute("src", '/userAvatar/'+res.data.user.userId+'.jpg');
        angular.element('#myImage').attr('src','userAvatar/1.jpg');
    });
    $scope.typingPass=function(){
        if($scope.confirmnewpass!==$scope.newpass) $scope.msg="Xác nhận mật khẩu sai";
        else $scope.msg=null;
    }
    $scope.uploadAvatar=function(){
        console.log('uploadAvatar');
        $window.location.href='/changeAvatar';
    }
}