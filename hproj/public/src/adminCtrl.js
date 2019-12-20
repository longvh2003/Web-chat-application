function AdminCtrl($scope,$http,$window) {     
    $scope.contacts = []; 
    $http.get('/getUsersId').then(res=>{
    	console.log(res.data);
    	res.data.forEach(element=>{
    		$scope.contacts.push({
    			id:element.user_id,
    			image:'userAvatar/'+element.user_id+'.jpg',
    			username:element.username
    		});
    	});
    });
    $scope.deleteUser=user_id=>{
    	$http({
    		method:'POST',
    		url:'/deleteUser',
    		data:{user_id}
    	});
        $window.location.reload();
    }
 } 