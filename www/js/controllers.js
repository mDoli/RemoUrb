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
      // {
      //   name: "Deutsch",
      //   shortcut: "de"
      // },
      {
        name: "English",
        shortcut: "en"
      },
      {
        name: "French",
        shortcut: "fr"
      },
      {
        name: "Español",
        shortcut: "es"
      },
      {
        name: "Polski",
        shortcut: "pl"
      }
    ];
    $scope.languagesFilter = {
      name: "English",
      shortcut: "en"
    };
    $scope.selectedLanguageModel = 'English';
    $scope.changeLanguage = function(key){
      $translate.use(key);
    };

    $scope.updateLanguage = function () {
      // $ionicPopup.alert({template:selectedLanguage.name});
      $scope.changeLanguage(selectedLanguage.value);
    }

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

  };

  // //chart
  // $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  // $scope.labelsWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // $scope.series = ['Series A', 'Series B'];
  // $scope.data = [
  //   [65, 59, 80, 81, 56, 55, 30],
  //   [28, 48, 40, 19, 86, 27, 90]
  // ];
  // $scope.onClick = function (points, evt) {
  //   console.log(points, evt);
  // };
  // $scope.chartUnitsX = [ { name: "month", value: "m" }, { name: "day", value: "d" }, { name: "hour", value: "h" } ]; //unit of y axis of chart
  // $scope.chartUnitsXFilter = { name: "month", value: "m" };
  // document.getElementById("chartUnitsX").value = "month";
  // $scope.chartUnitsY = [ { name: "Pound", value: "l" }, { name: "kWh", value: "kwh" } ]; //unit of y axis of chart
  // $scope.chartUnitsYFilter = { name: "kWh", value: "kwh" };
  // $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  // $scope.options = {
  //   scales: {
  //     yAxes: [
  //       {
  //         id: 'y-axis-1',
  //         type: 'linear',
  //         display: true,
  //         position: 'left'
  //       },
  //       {
  //         id: 'y-axis-2',
  //         type: 'linear',
  //         display: true,
  //         position: 'right'
  //       }
  //     ]
  //   }
  // };
  //
  // ///////////////////
  // //var mychart;
  // $scope.ctx;
  // $scope.ctx = document.getElementById("lineChart").getContext("2d");
  // $scope.mychart= new Chart($scope.ctx,
  //   {
  //     type: "line",
  //     data: $scope.data
  //   }).Line($scope.data, $scope.options);
  //
  // $scope.updateChart = function () {
  //   console.log('I am updating chart.');
  //   console.log(chartUnitsY.value);
  //   console.log(chartUnitsX.value);
  //   console.log(document.getElementsByTagName("canvas"));
  //   //var canvas = document.getElementById('lineChart');
  //
  //   mychart.destroy();
  //   //var ctx = document.getElementById("lineChart").getContext("2d");
  //   mychart = new Chart($scope.ctx).Line($scope.data, $scope.options);
  //   //canvas.update();
  //
  // }



  $scope.chartUnitsX = [ { name: "hour", value: "h" }, { name: "day", value: "d" }, { name: "month", value: "m" } ]; //unit of y axis of chart
  $scope.chartUnitsXFilter = $scope.chartUnitsX[0];
  //document.getElementById("chartUnitsX").value = "month";
  $scope.chartUnitsY = [ { name: "Pound", value: "l" }, { name: "kWh", value: "kwh" } ]; //unit of y axis of chart
  $scope.chartUnitsYFilter = { name: "kWh", value: "kwh" };
  $scope.labelsMonthFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  $scope.labelsMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  $scope.labelsWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  $scope.labelsHour = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  $scope.labelsDaysInMonth = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  $scope.usageDailyPerRoom = [[2.34,4.02,3.11,3.43,2.99,3.88,4.04], //Bathroom
    [1.94,3.02,2.09,2.27,1.85,2.73,3.01], //Bedroom
    [0,0,0,0,0,0,0], //Bedroom (2nd)
    [4.22,5.31,4.29,3.71,3.82,4.97,4.15], //Kitchen
    [3.61,4.90,4.67,4.33,4.45,3.76,5.12], //Living room
    [1.91,0.93,1.77,1.32,1.72,0.55,1.45] //Other
  ];
  $scope.usageHourlyPerRoom = [[2.34,2.22,2.31,2.43,2.99,3.88,4.04,3.24,3.72,3.77,3.13,2.79,2.68,2.54,2.34,3.02,3.11,3.43,2.99,3.88,4.04,4.10,4.02,3.11], //Bathroom
                                [1.94,3.02,2.09,2.27,1.85,2.73,3.01,1.94,3.02,2.09,2.27,1.85,2.73,3.01,1.94,3.02,2.09,2.27,1.85,2.73,3.01,1.94,3.02,2.09], //Bedroom
                                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //Bedroom (2nd)
                                [4.22,5.31,4.29,3.71,3.82,4.97,4.15,4.22,5.31,4.29,3.71,3.82,4.97,4.15,4.22,5.31,4.29,3.71,3.82,4.97,4.15,4.22,5.31,4.29], //Kitchen
                                [3.61,4.90,4.67,4.33,4.45,3.76,5.12,3.61,4.90,4.67,4.33,4.45,3.76,5.12,3.61,4.90,4.67,4.33,4.45,3.76,5.12,3.61,4.90,4.67], //Living room
                                [1.91,0.93,1.77,1.32,1.72,0.55,1.45,1.91,0.93,1.77,1.32,1.72,0.55,1.45,1.91,0.93,1.77,1.32,1.72,0.55,1.45,1.91,0.93,1.77] //Other
    ];

  $scope.usageDaysInMonthPerRoom = [[2.34,4.02,3.11,3.43,2.99,3.88,4.04,1.94,3.02,2.09,2.27,1.15,2.73,3.01,1.94,3.32,2.59,2.47,3.85,2.73,3.01,1.94,3.02,2.09,2.27,1.85,2.73,3.01,2.22,2.01,2.02], //Bathroom
    [2.34,4.02,3.11,3.43,2.99,3.88,4.04,1.94,3.02,2.09,2.27,1.15,2.73,3.01,1.94,3.32,2.59,2.47,3.85,2.73,3.01,1.94,3.02,2.09,2.27,1.85,2.73,3.01,2.22,2.01,2.02], //Bedroom
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], //Bedroom (2nd)
    [2.34,4.02,3.11,3.43,2.99,3.88,4.04,1.94,3.02,2.09,2.27,1.15,2.73,3.01,1.94,3.32,2.59,2.47,3.85,2.73,3.01,1.94,3.02,2.09,2.27,1.85,2.73,3.01,2.22,2.01,2.02], //Kitchen
    [2.34,4.02,3.11,3.43,2.99,3.88,4.04,1.94,3.02,2.09,2.27,1.15,2.73,3.01,1.94,3.32,2.59,2.47,3.85,2.73,3.01,1.94,3.02,2.09,2.27,1.85,2.73,3.01,2.22,2.01,2.02], //Living room
    [2.34,4.02,3.11,3.43,2.99,3.88,4.04,1.94,3.02,2.09,2.27,1.15,2.73,3.01,1.94,3.32,2.59,2.47,3.85,2.73,3.01,1.94,3.02,2.09,2.27,1.85,2.73,3.01,2.22,2.01,2.02] //Other
  ];
    // [0.0975,0.1675,0.12958,0.142916,0.12458,0.161666,0.16833,0.0975,0.1675,0.12958,0.142916,0.12458,0.161666,0.16833,0.0975,0.1675,0.12958,0.142916,0.12458,0.161666,0.16833,0.0975,0.1675,0.12958] //Bathroom
    // [0.08083,0.12583,0.087083,0.094583,0.077083,0.11375,0.125416,0.080833,0.12583,0.087083,0.094583,0.077083,0.11375,0.125416,0.080833,0.12583,0.087083,0.094583,0.077083,0.11375,0.125416,0.080833,0.12583,0.087083] //Bedroom
    // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] //Bedroom(2nd)
    // [0.17583,0.22125,0.17875,0.15458,0.159166,0.20708,0.172916,0.17583,0.22125,0.17875,0.15458,0.159166,0.20708,0.172916,0.17583,0.22125,0.17875,0.15458,0.159166,0.20708,0.172916,0.17583,0.22125,0.17875] //Kitchen
    // [0.150416,0.204166,0.19458,0.180416,0.185416,0.156666,0.21333,0.150416,0.204166,0.19458,0.180416,0.185416,0.156666,0.21333,0.150416,0.204166,0.19458,0.180416,0.185416,0.156666,0.21333,0.150416,0.204166,0.19458] //Living room
    // [0.079583,0.03875,0.07375,0.055,0.0716666,0.0229166,0.0604166,0.079583,0.03875,0.07375,0.055,0.0716666,0.0229166,0.0604166,0.079583,0.03875,0.07375,0.055,0.0716666,0.0229166,0.0604166,0.079583,0.03875,0.07375] //Other

  $scope.poundsPerKwh = 0.12;

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  var dat = {
    //labels: ["January", "February", "March", "April", "May", "June", "July"],
    labels: $scope.labelsWeek,
    datasets: [
      {
        label: "Bathroom consumption",
        backgroundColor: "rgba(20,22,250,0.2)",
        borderColor: "rgba(20,22,250,0.2)",
        pointBorderColor: "rgba(20,22,220,0.82)",
        fillColor: "rgba(22,22,220,0.2)",
        strokeColor: "rgba(80,3,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,0,1)",
        //data: [65, 59, 80, 81, 56, 55, 40]
        data: $scope.usageDailyPerRoom[0]
      }
      ,
      {
        label: "My Second dataset",
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [6, 9.5, 7.11, 6, 7.1, 8, 7.1]
      }
    ]
  };

  var myNewChart = new Chart(ctx , {
    type: "line",
    data: dat,
  });

  //myNewChart.data.labels = $scope.labelsWeek;

  $scope.getPricedValues = function (tab) {
    var res = tab.slice()
    // if((res === undefined) || (res[0] === undefined) || (res[0][0] === undefined)){
    //   return;
    // }
    for(var i = 0; i < res.length; i++) {
        res[i] = res[i] * $scope.poundsPerKwh;
    }
    console.log(tab);
    console.log(res);
    return res;
  };
  document.getElementById('chartUnitsX').value = 'day';
  $scope.updateChart = function () {
    console.log('I am updating chart.');
    //choose x axis unit
    if(chartUnitsX.value === $scope.chartUnitsX[0].name ) { //hour
        myNewChart.data.labels = $scope.labelsHour;
        if(chartUnitsY.value === $scope.chartUnitsY[0].name) { //pound
          console.log("case 1.1");
          myNewChart.data.datasets[0].data = $scope.getPricedValues($scope.usageHourlyPerRoom[0]);
        }
        else if(chartUnitsY.value === $scope.chartUnitsY[1].name) { //kwh
          console.log("case 1.2");
          myNewChart.data.datasets[0].data = $scope.usageHourlyPerRoom[0];
        }
    }
    else if(chartUnitsX.value === $scope.chartUnitsX[1].name) { //day (last week)
      myNewChart.data.labels = $scope.labelsWeek;
      if(chartUnitsY.value === $scope.chartUnitsY[0].name) { //pound
        console.log("case 2.1");
        myNewChart.data.datasets[0].data = $scope.getPricedValues($scope.usageDailyPerRoom[0]);
      }
      else if(chartUnitsY.value === $scope.chartUnitsY[1].name) { //kwh
        console.log("case 2.2");
        myNewChart.data.datasets[0].data = $scope.usageDailyPerRoom[0];
      }
    }
    else if(chartUnitsX.value === $scope.chartUnitsX[2].name) { //day (in month)
      myNewChart.data.labels = $scope.labelsDaysInMonth;
      if(chartUnitsY.value === $scope.chartUnitsY[0].name) { //pound
        console.log("case 3.1");
        myNewChart.data.datasets[0].data = $scope.getPricedValues($scope.usageDaysInMonthPerRoom[0]);
      }
      else if(chartUnitsY.value === $scope.chartUnitsY[1].name) { //kwh
        console.log("case 3.2");
        myNewChart.data.datasets[0].data = $scope.usageDaysInMonthPerRoom[0];
      }
    }
    console.log(Date.now());
    console.log(Date);
    console.log(Date.prototype.getTime());
    console.log(Date.prototype.getHours());
    console.log(Date.prototype.getYear());
    console.log(Date.prototype.getFullYear());
    //myNewChart.data.datasets[1].data.setVisible(false);
    myNewChart.update();
  };

});
