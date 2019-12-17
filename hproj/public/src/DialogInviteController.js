
function DialogInviteController($scope, $mdDialog, $http, $q, $timeout, $rootScope) {
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.simulateQuery = true;

    $scope.users = [];

    $scope.init = () =>{
        $http.post('/getFriendsInfo/' + $rootScope.userid).then((res) => {
            res.data.forEach(element=>{
                $scope.users.push(element);
            })
            console.log(1);
        })
    }

    $scope.sendInvite = id => {
        let data = {roomid: $rootScope.tempRoomId,roomname: $rootScope.tempRoomName, id: id}
        console.log(data);
        $http.post('/addNotifi', JSON.stringify(data)).then(res => {
            console.log(res.status);
        })
    }

    $scope.querySearch = (query) =>{
        var results = query ? $scope.users.filter(createFilterFor(query)) : $scope.users,
        deferred;
        return results;
    }

    function createFilterFor(query) {
        var lowercaseQuery = query.toLowerCase();
  
        return function filterFn(item) {
          return (item.username.toLowerCase().indexOf(lowercaseQuery) === 0);
        };
  
      }

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
            } else {
                $scope.showAlert("Tạo phòng không thành công", "Tên phòng đã tồn tại, vui lòng chọn tên khác");
                $mdDialog.hide();
            }
        })
        $rootScope.$broadcast('reloadRoom');
    }    
}
