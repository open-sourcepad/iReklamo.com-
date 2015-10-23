angular.module('starter.new_c', ['ngCordova'])


.controller('NewComplainCtrl', function($rootScope,$scope, $ionicLoading, $compile,User,$state,$cordovaCamera, $cordovaFile,$ionicPopup,$http) {

  setDefault = function(){
    $http.defaults.headers.common.Authorization = $rootScope.currentUser.access_token;
    $http.defaults.headers.common["Access-Control-Allow-Origin"]= "*";

    $scope.data = { "ImageURI" :  "Select Image" };
    $scope.myImg = null
    $scope.complaints = {
      image: "",
      title: "",
      description: "",
      latitude: 14.585977399999999,
      longitude: 121.0605605,
      category: ""
    };
  };

  $scope.save = function(){

    complaint = {
      image: $scope.myImage,
      title: $scope.complaints.title,
      description: $scope.complaints.description,
      latitude: 14.585977399999999,
      longitude: 121.0605605,
      category: $scope.complaints.category
    }

    $ionicLoading.show({template: 'Saving..', duration:500});

    User.complaints({complaint: complaint}).$promise.then(function(data) {
      //localStorage.setItem('user', JSON.stringify(data.user));
      $ionicLoading.hide();

      $scope.complaints = {
        image: "",
        title: "",
        description: "",
        latitude: 14.585977399999999,
        longitude: 121.0605605,
        category: ""
      };
      
      $ionicPopup.alert({
        title: 'Success',
        content: 'Thank you concerned citizen'
      }).then(function(res) {
        $state.go("app.complaints")
      });

    });
  };
   $scope.selectPicture = function() {
   var options = {
     quality: 70,
     sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
     destinationType: Camera.DestinationType.DATA_URL,
     encodingType: Camera.EncodingType.JPEG,
     correctOrientation: true,
     saveToPhotoAlbum: false
   };

  //  $cordovaCamera.getPicture(options).then(function(imageData) {
  //           $scope.imgURI = "data:image/jpeg;base64," + imageData;
  //       }, function(err) {
  //           // An error occured. Show a message to the user
  //       });
  //
   $cordovaCamera.getPicture(options).then(function(imageURI) {

     $scope.myImg = "data:image/jpeg;base64," + imageURI;
    //console.log($scope.myImg);

    var myCanvas = document.getElementById('myimg');
    var ctx = myCanvas.getContext('2d');
    var img = new Image;
    img.onload = function(){
      ctx.drawImage(img,0,0); // Or at whatever offset you like
    };
    img.src = $scope.myImg;


    //  window.resolveLocalFileSystemURL(imageURI, function(fileEntry) {
    //    console.log(imageURI);
    //    $scope.picData = fileEntry.nativeURL;
    //    $scope.ftLoad = true;
    //    var image = document.getElementById('myImage');
    //    image.src = fileEntry.nativeURL;
    //    console.log(fileEntry.nativeURL);
    //    });
       //$ionicLoading.show({template: 'Loading..', duration:500});

   },function(err){
     $ionicLoading.show({template: 'fakkk.', duration:500});
   });

 };

 });
