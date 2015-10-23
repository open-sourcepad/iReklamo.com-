angular.module('starter.controllers', [])

.controller('AppCtrl', function($ionicLoading,$rootScope,$scope, $ionicModal, $timeout, $cordovaCamera, $cordovaFile,User) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  $scope.navTitle = '<i class="icon icon-plus"/>';

  $scope.newUser = {
    email: "",
    name: "",
    password: "",
    password_confirmation: ""
  }


  $scope.credentials = {
    email: "",
    password: ""
  }

  localUser = localStorage.getItem('user');
  if(!!localUser){
    $rootScope.currentUser = JSON.parse(localStorage.getItem('user'));
  }
  else {
    $rootScope.currentUser = false;
  }

  $scope.doLogin = function(){
    $ionicLoading.show({template: 'Loading..', duration:500});
    User.save({user: $scope.credentials}).$promise.then(function(data) {
      $rootScope.user = data
      localStorage.setItem('user', JSON.stringify(data.user));
      $scope.closeLogin();
    }).finally(function(){
        $ionicLoading.hide();
      }
    );
  };

  $scope.doRegister = function(){
        $ionicLoading.show({template: 'Loading..', duration:500});
    User.login({user: $scope.newUser}).$promise.then(function(data) {
      localStorage.setItem('user', JSON.stringify(data.user));
      $scope.closeRegister();
    }).finally(function(){
        $ionicLoading.hide();
      }
    );
  };

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.registerModal = modal;
  });


  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Triggered in the login modal to close it
  $scope.closeRegister = function() {
    $scope.registerModal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Open the login modal
  $scope.register = function() {
    $scope.registerModal.show();
  };

  // Perform the login action when the user submits the login form
  // $scope.doLogin = function() {
  //   console.log('Doing login', $scope.loginData);
  //
  //   // Simulate a login delay. Remove this and replace with your login
  //   // code if using a login system
  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 1000);
  // };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

// .controller('PlaylistCtrl', function($scope, $stateParams) {
// })

.controller('NewComplainCtrl', function($scope, $ionicLoading, $compile) {

})

.controller('ComplainsCtrl', function($scope, $ionicLoading, $compile) {
  function initialize() {

    var myLatlng = new google.maps.LatLng(14.585977399999999,121.0605605);
    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

    //Marker + infowindow + angularjs compiled ng-click
    var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
    var compiled = $compile(contentString)($scope);

    var infowindow = new google.maps.InfoWindow({
      content: compiled[0]
    });

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Uluru (Ayers Rock)'
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });

    $scope.map = map;
  }

  //google.maps.event.addDomListener(window, 'load', initialize);

  $scope.centerOnMe = function() {
    if(!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      console.log(pos.coords.latitude, pos.coords.longitude);
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $ionicLoading.hide();
    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });
  };

  ionic.Platform.ready(initialize);

  $scope.clickTest = function() {
    alert('Example of infowindow with ng-click')
  };


});
