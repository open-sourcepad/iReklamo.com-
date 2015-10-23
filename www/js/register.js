angular.module('starter.register', [])


.controller('RegisterCtrl', function($scope, $ionicLoading, $compile,User,$state) {


  $scope.credentials = {
    email: "",
    name: "",
    password: "",
    password_confirmation: ""
  }

  $scope.back = function(){
             $state.go('login');
  };

  $scope.submit = function(){
    User.save({user: $scope.credentials}).$promise.then(function(data) {
      localStorage.setItem('testObject', JSON.stringify(data.user));
    });
  }

})


.controller('LoginCtrl', function($scope, $ionicLoading, $compile,User,$state) {


  $scope.credentials = {
    email: "",
    password: ""
  }


    $scope.goTo = function(type){
         $state.go('register');
    };

  $scope.login = function(){
      debugger;
  };

  $scope.submit = function(){
    User.login({user: $scope.credentials}).$promise.then(function(data) {
      localStorage.setItem('testObject', JSON.stringify(data.user));
    });
  }


});
