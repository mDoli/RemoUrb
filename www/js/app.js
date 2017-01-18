// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
      })

      // Each tab has its own nav history stack:

      .state('tab.dash', {
        url: '/dash',
        views: {
          'tab-myhome': {
            templateUrl: 'templates/tab-myhome.html' //,
            //controller: 'DashCtrl'
            //controller: 'ReadingsCtrl as hCtrl'
          }
        }
      })

      .state('tab.dash-game', {
        url: '/dash/game',
        views: {
          'tab-myhome': {
            //templateUrl: 'templates/view-game.html'
            templateUrl: 'setup/Question1.html'
          }
        }
      })

      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-leaderboard': {
            templateUrl: 'templates/tab-leaderboard.html',
            controller: 'ChatsCtrl'
          }
        }
      })
      .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
          'tab-leaderboard': {
            templateUrl: 'templates/chat-detail.html',
            controller: 'ChatDetailCtrl'
          }
        }
      })

      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-account.html',
            controller: 'AccountCtrl'
          }
        }
      })

      .state('configQ1', {
        url: '/dash/Q1',
        views: {
          'tab-myhome': {
            //templateUrl: 'templates/view-game.html'
            templateUrl: 'setup/Question1.html',
            controller: 'QuestionaireControl'
          }
        }
      })

      .state('configQ2', {
        url: '/dash/Q2',
        views: {
          'tab-myhome': {
            //templateUrl: 'templates/view-game.html'
            templateUrl: 'setup/Question2.html',
            controller: 'QuestionaireControl'
          }
        }
      })

    .state('configQ3', {
      url: '/dash/Q3',
      views: {
        'tab-myhome': {
          //templateUrl: 'templates/view-game.html'
          templateUrl: 'setup/Question3.html',
          controller: 'QuestionaireControl'
        }
      }
    });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

    //if (window.localStorage.getItem("configurationDone") == null)
    //{
      //$scope.showConfirm();
      //do configuration

    //}
    // {
    //
    // } state.go
    //obrazki do radiobutton

    // A confirm dialog
    // $scope.showConfirm = function() {
    //   var confirmPopup = $ionicPopup.confirm({
    //     title: 'Important information',
    //     template: 'Obligatory configuration has not been carried out. Do you want to do it now?',
    //     cancelText: 'Quit'
    //   });
    //   confirmPopup.then(function(res) {
    //     if(res) {
    //       console.log('Configuration started. ');
    //     } else {
    //       console.log('Configuration aborted. I am closing the application. ');
    //     }
    //   });
    // };

  });
