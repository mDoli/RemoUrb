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

  // .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  //   $scope.chat = Chats.get($stateParams.chatId);
  // })
  // //document.getElementsById("buttonNeighborhood").click();

  .controller('LeaderboardCtrl', function($scope, $http, $ionicPopup) {

    var ctrl = this;
    var neighborhood = "neighborhood";
    var town = "town";

    $scope.dataNeighborhood = [
      {
        id: 1,
        name: "James Brown",
        points: 2030
      },
      {
        id: 2,
        name: "Charles Franklin",
        points: 1922
      },
      {
        no: 3,
        name: "Me",
        points: 1806
      },
      {
        id: 4,
        name: "Greta Ellis",
        points: 1799
      }
    ];
    $scope.dataTown = [
      {
        id: 1,
        name: "West Bridgford (me)",
        points: 10588
      },
      {
        id: 2,
        name: "Clifton",
        points: 10220
      },
      {
        id: 3,
        name: "Hyson Green",
        points: 9034
      },
      {
        id: 4,
        name: "St Anns",
        points: 7753
      },
      {
        id: 5,
        name: "Lace Market",
        points: 5138
      },
      {
        id: 6,
        name: "Lenton",
        points: 2067
      }
    ];
    $scope.data = $scope.dataNeighborhood;

    $scope.lbType = 'neighborhood';
    $scope.setLbType = function(p) {
      $scope.lbType = p;
      $scope.update();
      // if(p == neighborhood)
      // {
      //   $scope.data = $scope.dataNeighborhood;
      //   $scope.refreshData;
      // }
      // else
      // {
      //   $scope.data = $scope.dataTown;
      // }
    };
    $scope.update = function () {
      if($scope.lbType == neighborhood)
      {
        $scope.data = $scope.dataNeighborhood;
      }
      else
      {
        $scope.data = $scope.dataTown;
      }
    };

    $http.post('http://127.0.0.1:8080/remourban/getleaderboardpdo.php')
    //$http.post('http://192.168.0.20:8080/remourban/getleaderboardpdo.php')
      .success(function(response) {
        $scope.dataNeighborhood = response.data;
        $ionicPopup.alert({
          title: 'Done',
          template: 'Content refreshed'
        });
        $scope.update();
      })
      .error(function(error, status){
        $scope.httpError = { message: error, status: status};
        $ionicPopup.alert({
          title: 'Error',
          template: 'Database not connected. <br />' + 'Error message: ' + $scope.httpError.message + '<br>Error code: ' + $scope.httpError.status
        });
        console.log($scope.httpError.status);
      })

    $scope.refreshData = function() {
      var dbAddress = document.getElementById("DB_ADDRESS").value;
      var dbPort = document.getElementById("DB_PORT").value;
      // $ionicPopup.alert({template: 'http://' + dbAddress + ':' + dbPort + '/remourban/getleaderboardpdo.php'});
      $http.post('http://' + dbAddress + ':' + dbPort + '/remourban/getleaderboardpdo.php')
        .success(function(response) {
          console.log("\n\n\n");
          console.log(response);
          console.log("\n\n\n");
          $scope.dataNeighborhood = response.data;
          $ionicPopup.alert({
            title: 'Done',
            template: 'Content refreshed'
          });
          $scope.update();
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

  .controller('AccountCtrl', function($scope, $translate, $ionicPopup, $http) {
    $scope.settingsList = [
      { name: "Autorefreshing", translate_name: "AUTOREFRESHING", checked: true },
      { name: "Enable popups", translate_name: "ENABLE_POPUPS", checked: true }
    ];
   $scope.stories = [
     { title: 'First St' },
     { title: 'Second St' }
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
    $scope.changeLanguage = function(key){
      $translate.use(key);
    };
    $scope.connection = {dbAddress: "127.0.0.1", dbPort: "8080"};

    $scope.testConnection = function () {
      ///
      var dbAddress = document.getElementById("DB_ADDRESS").value;
      var dbPort = document.getElementById("DB_PORT").value;
      //$ionicPopup.alert({template: 'http://' + dbAddress + ':' + dbPort + '/remourban/getleaderboardpdo.php'});
      $http.post('http://' + dbAddress + ':' + dbPort + '/remourban/getleaderboardpdo.php')
        .success(function(response) {
          console.log("\n\n\n");
          console.log(response);
          console.log("\n\n\n");
          //$scope.dataNeighborhood = response.data;
          $ionicPopup.alert({
            title: 'Success',
            template: 'Database connected'
          });
        })
        .error(function(error, status){
          $scope.httpError = { message: error, status: status};
          $ionicPopup.alert({
            title: 'Connection error',
            template: 'Error message: ' + $scope.httpError.message + '<br>Error code: ' + $scope.httpError.status
          });
          //console.log($scope.httpError.status);
        })
      ///
      console.log('asd');
      // $ionicPopup.alert({
      //   title: 'Database connection test',
      //   template: 'Success'
      // });
    }
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

  // .controller('ReadingCtrl', function($scope) {
  //
  //   var ctrl = this;
  //
  //   //ctrl.add = add;
  //   ctrl.homeReadings = [
  //     {
  //       room: "Bathroom",
  //       temp: 20.5,
  //       humid: 81,
  //       active: true
  //     },
  //     {
  //       room: "Bedroom",
  //       temp: 20,
  //       humid: 53,
  //       active: true
  //     },
  //     {
  //       room: "Bedroom (2nd)",
  //       temp: 20.5,
  //       humid: 49,
  //       active: false
  //     },
  //     {
  //       room: "Kitchen",
  //       temp: 21,
  //       humid: 61,
  //       active: true
  //     },
  //     {
  //       room: "Living room",
  //       temp: 21.5,
  //       humid: 50,
  //       active: true
  //     },
  //     {
  //       room: "Other",
  //       temp: 21.5,
  //       humid: 53,
  //       active: true
  //     }
  //   ];
  //   $scope.homeImage = "../img/home.png";
  //
  //   ////////
  //   // function add(index) {
  //   //   window.alert("Added: " + index);
  //   // }
  // })

.controller('MyHomeCtrl', function($scope, $cordovaCamera, $cordovaFile, $ionicPopup, $state, $ionicPopover) {
 // // 1
 // $scope.images = [];
 // $scope.homeImage = "../img/home.png";
 // document.getElementById("myHomePhoto").src= homeImage;
 //
 // $scope.addImage = function() {
 // // 2
 //   var options = {
 //   destinationType : Camera.DestinationType.FILE_URI,
 //   sourceType : Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
 //   allowEdit : false,
 //   encodingType: Camera.EncodingType.JPEG,
 //   popoverOptions: CameraPopoverOptions,
 // };
 //
 // // 3
 // $cordovaCamera.getPicture(options).then(function(imageData) {
 //
 // // 4
 // onImageSuccess(imageData);
 //
 // function onImageSuccess(fileURI) {
 //  createFileEntry(fileURI);
 // }
 //
 // function createFileEntry(fileURI) {
 //  window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
 // }
 //
 // // 5
 // function copyFile(fileEntry) {
 //   var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
 //   var newName = makeid() + name;
 //
 //   window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
 //     fileEntry.copyTo(
 //       fileSystem2,
 //       newName,
 //       onCopySuccess,
 //       fail
 //       );
 //     },
 //     fail);
 // }
 //
 // // 6
 // function onCopySuccess(entry) {
 //   $scope.$apply(function () {
 //     $scope.images.clearAll();
 //     $scope.images.push(entry.nativeURL);
 //     document.getElementById("myHomePhoto").src = entry.nativeURL;
 //   });
 // }
 //
 // function fail(error) {
 //  console.log("fail: " + error.code);
 // }
 //
 // function makeid() {
 //   var text = "";
 //   var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 //
 //   for (var i=0; i < 5; i++) {
 //    text += possible.charAt(Math.floor(Math.random() * possible.length));
 //   }
 //   return text;
 // }
 //
 // }, function(err) {
 //  console.log(err);
 // });
 // }
 //
 // $scope.urlForImage = function(imageName) {
 //   var name = imageName.substr(imageName.lastIndexOf('/') + 1);
 //   var trueOrigin = cordova.file.dataDirectory + name;
 //   return trueOrigin;
 // }
 //
 // $scope.dealWithPicture = function(){
 //  alert("hold on detected");
 // }
 //
 //  $ionicPopover.fromTemplateUrl('templates/popover.html', {
 //    scope: $scope,
 //  }).then(function(popover) {
 //    $scope.popover = popover;
 //  });

  $scope.trueVar = true;
  var ctrl = this;
  $scope.homeReadings = [
    { room: "Bathroom", temp: 20.5, humid: 81, active: true },
    { room: "Bedroom", temp: 20, humid: 53, active: true },
    { room: "Bedroom (2nd)", temp: 20.5, humid: 49, active: false },
    { room: "Kitchen", temp: 21, humid: 61, active: true },
    { room: "Living room", temp: 21.5, humid: 50, active: true },
    { room: "Other", temp: 21.5, humid: 53, active: true }
  ];
 //})

//.controller('QuestionaireControl', function($scope, $ionicPopup) {

  // $scope.roomList = [
  //   { text: "Bathroom", checked: false },
  //   { text: "Bedroom", checked: false },
  //   { text: "Bathroom (2nd)", checked: false },
  //   { text: "Kitchen", checked: false },
  //   { text: "Living room", checked: false },
  //   { text: "Other", checked: false }
  // ];

  $scope.doConfig = function(){
    var confirmPopup = $ionicPopup.confirm({
      title: 'No home data',
      template: 'Do you want to personalize configuration to your home?'
    });
    confirmPopup.then(function(res) {
      if(res) {
        console.log('I am starting the configuration');
      } else {
        console.log('I am quitting');
      }
    });
  }
  var q1 = document.getElementById("question1");
  var q2 = document.getElementById("question2");
  var q3 = document.getElementById("question3");
  var vw = document.getElementById("questionaireView");
  $scope.nextQ1 = function(){

    //$ionicPopup.alert({
    //   title: 'Done',
    //   template: 'I am switching to Q2' + document.getElementById("question1").style.visibility
    // });
    $state.go('configQ2');
    q2.style.visibility = "hidden";
    q3.style.visibility = "visible";
  }
  $scope.nextQ2 = function(){
    q1.style.visibility = "hidden";
    q2.style.visibility = "visible";
   // $state.go
  }
  $scope.nextQ3 = function(){
   // $state.go
  }

  $scope.takePicture = function () {

    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      //var image = document.getElementById('myImage');
      $scope.homePhoto = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // error
    });

  }

  //chart
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  };

});
