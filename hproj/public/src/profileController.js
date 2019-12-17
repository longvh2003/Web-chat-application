function ProfileCtrl($scope, $rootScope,$http){
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
}