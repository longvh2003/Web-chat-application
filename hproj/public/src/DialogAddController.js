function DialogAddController($scope, $mdDialog, $http, $rootScope) {
    $scope.hide = function() {
        $mdDialog.hide();
    };

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };

    /**
     * Hiển thị alert thành công hoặc thất bại
     */

    $scope.showAlert = function(status, des) {
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
        if($scope.newroompassword === undefined) $scope.newroompassword = "";
        if($scope.newroomdes === undefined) $scope.newroomdes = "";
        let data = {name: $scope.newroomname, pass: $scope.newroompassword, des: $scope.newroomdes, userid: $rootScope.userid}
        $http.post('/home/addRoom', JSON.stringify(data)).then((result) =>{
            if(result.data.status){
                $scope.showAlert("Tạo phòng thành công", "Tạo thành công!!");
                $rootScope.$emit('reloadRoom')
            } else {
                $scope.showAlert("Tạo phòng không thành công", "Tên phòng đã tồn tại, vui lòng chọn tên khác");
                $mdDialog.hide();
            }
        })
        $rootScope.$broadcast('reloadRoom');
    }    
}
