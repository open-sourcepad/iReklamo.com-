angular.module('starter.new_c', ['ngCordova'])


.controller('NewComplainCtrl', function($scope, $ionicLoading, $compile,User,$state,$cordovaCamera, $cordovaFile) {


  $scope.data = { "ImageURI" :  "Select Image" };
  $scope.myImg = null
  //  $scope.takePicture = function() {
  //  var options = {
  //      quality: 50,
  //      destinationType: Camera.DestinationType.FILE_URL,
  //      sourceType: Camera.PictureSourceType.PHOTOLIBRARY
  //    };
  //  $cordovaCamera.getPicture(options).then(
  //  function(imageData) {
  //    $scope.picData = imageData;
  //    $scope.ftLoad = true;
  //    $localstorage.set('fotoUp', imageData);
  //    $ionicLoading.show({template: 'Foto acquisita...', duration:500});
  //  },
  //  function(err){
  //    $ionicLoading.show({template: 'Errore di caricamento...', duration:500});
  //    })
  //  }

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

    complaint = {
      image: $scope.myImage,
      title: $scope.complaints.title,
      description: $scope.complaints.description,
      latitude: $scope.complaints.latitude,
      longitude: $scope.complaints.longitude,
      category: $scope.complaints.category
    }
    User.complaints()

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
