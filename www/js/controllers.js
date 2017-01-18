angular.module('starter.controllers', ['ionic']) //, 'ngCordova'

  .controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })
  //document.getElementsById("buttonNeighborhood").click();

  .controller('LeaderboardCtrl', function($scope, $http, $ionicPopup) {

    var ctrl = this;
    var neighborhood = "neighborhood";
    var town = "town";

    ctrl.dataNeighborhood = [
      {
        no: 1,
        name: "James Brown",
        points: 2030
      },
      {
        no: 2,
        name: "Charles Franklin",
        points: 1922
      },
      {
        no: 3,
        name: "Me",
        points: 1807
      },
      {
        no: 4,
        name: "Greta Ellis",
        points: 1799
      }
    ];
    ctrl.dataTown = [
      {
        no: 1,
        name: "West Bridgford (me)",
        points: 10588
      },
      {
        no: 2,
        name: "Clifton",
        points: 10220
      },
      {
        no: 3,
        name: "Hyson Green",
        points: 9034
      },
      {
        no: 4,
        name: "St Anns",
        points: 7753
      },
      {
        no: 5,
        name: "Lace Market",
        points: 5138
      },
      {
        no: 6,
        name: "Lenton",
        points: 2067
      }
    ];
    ctrl.data = ctrl.dataNeighborhood;

    $scope.lbType = 'neighborhood';
    $scope.setLbType = function(p) {
      $scope.lbType = p;
      if(p == neighborhood)
      {
        ctrl.data = ctrl.dataNeighborhood;
        ctrl.refreshData;
      }
      else
      {
        ctrl.data = ctrl.dataTown;
      }
    }
    $http.post('http://127.0.0.1:8080/remourban/getleaderboardpdo.php')
      .success(function(response) {
        $scope.dataNeighborhood = response.data;
        $ionicPopup.alert({
          title: 'Done',
          template: 'Content refreshed'
        });
      })
      .error(function(error, status){
        $scope.httpError = { message: error, status: status};
        $ionicPopup.alert({
          title: 'Error',
          template: 'Error message: ' + $scope.httpError.message + '<br>Error code: ' + $scope.httpError.status
        });
        console.log($scope.httpError.status);
      })

    $scope.refreshData = function() {
      $http.post('http://127.0.0.1:8080/remourban/getleaderboardpdo.php')
        .success(function(response) {
          $scope.dataNeighborhood = JSON.parse(response.data);
          $ionicPopup.alert({
            title: 'Done',
            template: 'Content refreshed'
          });
        })
        .error(function(error, status){
          $scope.httpError = { message: error, status: status};
          $ionicPopup.alert({
            title: 'Error',
            template: 'Error message: ' + $scope.httpError.message + '<br>Error code: ' + $scope.httpError.status
          });
          //console.log($scope.httpError.status);
        })
    };
    $scope.refreshDatatest = function() {
      $ionicPopup.alert('I am refreshing');
    }

  })

  .controller('AccountCtrl', function($scope) {
    $scope.settingsList = [
      { text: "Autorefreshing", checked: true },
      { text: "Enable popups", checked: true }
    ];
   $scope.stories = [
     {
       title: 'First St'
     },
     {
       title: 'Second St'
     }
   ];

    $scope.languages = [
      {
        name: "Deutsch",
        shortcut: "de"
      },
      {
        name: "English",
        shortcut: "en"
      },
      {
        name: "Español",
        shortcut: "es"
      },
      {
        name: "Polski",
        shortcut: "pl"
      }
    ]
    $scope.languagesFilter = {
      name: "English",
      shortcut: "en"
    }
  })

  .controller('ReadingCtrl', function($scope) {

    var ctrl = this;

    //ctrl.add = add;
    ctrl.homeReadings = [
      {
        room: "Living room",
        temp: 21.5,
        humid: 33
      },
      {
        room: "Kitchen",
        temp: 21,
        humid: 54
      },
      {
        room: "Bedroom",
        temp: 20,
        humid: 1807
      },
      {
        room: "Bathroom",
        temp: 20.5,
        humid: 77
      }
    ]

    ////////
    // function add(index) {
    //   window.alert("Added: " + index);
    // }
  })

  .controller('LanguageCtrl', function($scope, $http) {
    var ctrl = this;

    ctrl.add = add;
    ctrl.data = [
      {
        name: "Deutsch",
        shortcut: "de"
      },
      {
        name: "English",
        shortcut: "en"
      },
      {
        name: "Español",
        shortcut: "es"
      },
      {
        name: "Polski",
        shortcut: "pl"
      }
    ]
  })

.controller('MyHomeCtrl', function($scope, $cordovaCamera, $cordovaFile, $ionicPopup, $ionicPopover) {
 // 1
 $scope.images = [];
 $scope.homeImage = "../img/home.png";
 document.getElementById("myHomePhoto").src= homeImage;

 $scope.addImage = function() {
 // 2
   var options = {
   destinationType : Camera.DestinationType.FILE_URI,
   sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
   allowEdit : false,
   encodingType: Camera.EncodingType.JPEG,
   popoverOptions: CameraPopoverOptions,
 };

 // 3
 $cordovaCamera.getPicture(options).then(function(imageData) {

 // 4
 onImageSuccess(imageData);

 function onImageSuccess(fileURI) {
  createFileEntry(fileURI);
 }

 function createFileEntry(fileURI) {
  window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
 }

 // 5
 function copyFile(fileEntry) {
   var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
   var newName = makeid() + name;

   window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
     fileEntry.copyTo(
       fileSystem2,
       newName,
       onCopySuccess,
       fail
       );
     },
     fail);
 }

 // 6
 function onCopySuccess(entry) {
   $scope.$apply(function () {
     $scope.images.clearAll();
     $scope.images.push(entry.nativeURL);
     document.getElementById("myHomePhoto").src = entry.nativeURL;
   });
 }

 function fail(error) {
  console.log("fail: " + error.code);
 }

 function makeid() {
   var text = "";
   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

   for (var i=0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
   }
   return text;
 }

 }, function(err) {
  console.log(err);
 });
 }

 $scope.urlForImage = function(imageName) {
   var name = imageName.substr(imageName.lastIndexOf('/') + 1);
   var trueOrigin = cordova.file.dataDirectory + name;
   return trueOrigin;
 }

 $scope.dealWithPicture = function(){
  alert("hold on detected");
 }

  $ionicPopover.fromTemplateUrl('templates/popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.trueVar = true;
  var ctrl = this;
  ctrl.homeReadings = [
    {
      room: "Bathroom",
      temp: 20.5,
      humid: 81,
      active: true
    },
    {
      room: "Bedroom",
      temp: 20,
      humid: 53,
      active: true
    },
    {
      room: "Bedroom (2nd)",
      temp: 20.5,
      humid: 49,
      active: false
    },
    {
      room: "Kitchen",
      temp: 21,
      humid: 61,
      active: true
    },
    {
      room: "Living room",
      temp: 21.5,
      humid: 50,
      active: true
    },
    {
      room: "Other",
      temp: 21.5,
      humid: 50,
      active: false
    }
  ];
 //})

//.controller('QuestionaireControl', function($scope, $ionicPopup) {

    $scope.roomList = [
      { text: "Bathroom", checked: false },
      { text: "Bedroom", checked: false },
      { text: "Bathroom (2nd)", checked: false },
      { text: "Kitchen", checked: false },
      { text: "Living room", checked: false },
      { text: "Other", checked: false }
    ];

  $scope.nextQ1 = function(){

    $ionicPopup.alert({
      title: 'Done',
      template: 'I am switching to Q2'
    });
    $state.go('configQ2');
  }
  $scope.nextQ2 = function(){
    $state.go
  }
  $scope.nextQ3 = function(){
    $state.go
  }
});
