function ProfileCtrl($scope, $rootScope){
    $rootScope.$on('username', ()=>{
        $scope.username = $rootScope.username;
    })
    $scope.password = 'sample';
    $scope.hidePassword = true;
    $scope.myDate = new Date();


    $scope.changeAvatar= function(me){
        if (me.files && me.files[0]) {
            let url = URL.createObjectURL(me.files[0]); // set src to blob url
            angular.element('.avatar').css('background-image', 'url(' + url +')');
        }
    }
}