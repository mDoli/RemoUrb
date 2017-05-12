// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services', 'pascalprecht.translate', 'chart.js'])

  .run(function($ionicPlatform, $ionicPopup) {
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
      console.log('Run');
    });
  })

  .config(function($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $translateProvider) {

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
      // .state('config1', {
      //   url: '/config',
      //   abstract: true,
      //   views: {
      //     'config': {
      //       //templateUrl: 'templates/view-game.html'
      //       templateUrl: 'setup/Question1.html'
      //     }
      //   }
      // })

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
            //controller: 'QuestionaireControl'
            controller: 'MyHomeCtrl'
          }
        }
      })

      .state('configQ2', {
        url: '/dash/Q2',
        views: {
          'tab-myhome': {
            //templateUrl: 'templates/view-game.html'
            templateUrl: 'setup/Question2.html',
            //controller: 'QuestionaireControl'
            controller: 'MyHomeCtrl'
          }
        }
      })

    .state('configQ3', {
      url: '/dash/Q3',
      views: {
        'tab-myhome': {
          //templateUrl: 'templates/view-game.html'
          templateUrl: 'setup/Question3.html',
          //controller: 'QuestionaireControl'
          controller: 'MyHomeCtrl'
        }
      }
    });

    // $ionicPopup.show({
    //   title: 'Configuration required',
    //   template: 'Config now?',
    //   buttons: [
    //     {text: 'Yes',
    //       ontap: function(){
    //
    //         $urlRouterProvider.otherwise('/dash/Q1');
    //       }},
    //     {text: 'Quit',
    //       ontap: function(){
    //         $urlRouterProvider.otherwise('/tab/dash');
    //       }}
    //   ]
    // });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');
    $urlMatcherFactoryProvider.caseInsensitive(true);

    $translateProvider.fallbackLanguage('en');
    $translateProvider.registerAvailableLanguageKeys(['en', 'es', 'pl'], {
        'en_*':'en',
        'es_*':'es',
        'pl_*':'pl'
      })
    $translateProvider.translations('en', {
      AUTOREFRESHING: "Autorefreshing",
      BUTTON_LANG_EN: "english",
      BUTTON_LANG_ES: "spanish",
      BUTTON_LANG_FR: "french",
      BUTTON_LANG_PL: "polish",
      CHART_UNIT: "Chart unit",
      CONFIGURATION: "Configuration",
      DB_ADDRESS: "Database address",
      DB_PORT: "Database port",
      ENABLE_POPUPS: "Enable popups",
      HOME_SAVING_STATUS: "Home saving status:",
      LANGUAGE: "Language",
      MY_ACCOUNT: "My account",
      NUMBER_SHORTCUT: "No.",
      NAME: "Name",
      QUESTION_WHAT_LANGUAGE: "What is your language?",
      POINTS: "Points",
      ROOM: "Room",
      SHOW_CONSUMPTION_BY: "Show consumption by",
      SHOW_CONSUMPTION_IN: "Show consumption in",
      TEST: "Test",
      TIME: "Time",
      UNIT: "Unit"
    });
    $translateProvider.translations('es', {
      AUTOREFRESHING: "Refrescante automática",
      BUTTON_LANG_EN: "inglés",
      BUTTON_LANG_ES: "español",
      BUTTON_LANG_PL: "polaco",
      CONFIGURATION: "Configuración",
      DB_ADDRESS: "Dirección de base de datos",
      DB_PORT: "Puerto de base de datos",
      ENABLE_POPUPS: "Habilitar ventanas emergentes",
      HOME_SAVING_STATUS: "Estado de ahorro para el hogar:",
      LANGUAGE:"Idioma",
      MY_ACCOUNT: "Mi cuenta",
      NUMBER_SHORTCUT: "No.",
      NAME: "No.",
      QUESTION_WHAT_LANGUAGE: "¿A dónde vas?",
      POINTS: "Puntos",
      SHOW_CONSUMPTION_BY: "Mostrar el consumo por",
      SHOW_CONSUMPTION_IN: "Mostrar el consumo en",
      TEST: "Prueba"
    });
    $translateProvider.translations('fr', {
      AUTOREFRESHING: "Rafraîchissement automatique",
      BUTTON_LANG_EN: "anglais",
      BUTTON_LANG_ES: "espagnol",
      BUTTON_LANG_FR: "français",
      BUTTON_LANG_PL: "polonais",
      CONFIGURATION: "Configuration",
      DB_ADDRESS: "Adresse de base de données",
      DB_PORT: "Port de base de données",
      ENABLE_POPUPS: "Activer les popups",
      HOME_SAVING_STATUS: "État d'enregistrement de la maison:",
      LANGUAGE:"Langua",
      MY_ACCOUNT: "Mon compte",
      NUMBER_SHORTCUT: "No.",
      NAME: "Nom",
      QUESTION_WHAT_LANGUAGE: "What is your language?",
      POINTS: "Points",
      SHOW_CONSUMPTION_BY: "Montrer la consommation par",
      SHOW_CONSUMPTION_IN: "Montrer la consommation dans",
      TEST: "Test"
    });
    $translateProvider.translations('pl', {
      AUTOREFRESHING: "Autoodświeżanie",
      BUTTON_LANG_EN: "angielski",
      BUTTON_LANG_ES: "hiszpański",
      BUTTON_LANG_PL: "polski",
      CONFIGURATION: "Konfiguracja",
      DB_ADDRESS: "Adres bazy danych",
      DB_PORT: "Port bazy danych",
      ENABLE_POPUPS: "Powiadomienia",
      HOME_SAVING_STATUS: "Domowy status oszczędzania:",
      LANGUAGE:"Język",
      MY_ACCOUNT: "Moje konto",
      NUMBER_SHORTCUT: "Nr",
      NAME: "Nazwa",
      QUESTION_WHAT_LANGUAGE: "Jaki jest Twój język?",
      POINTS: "Punkty",
      SHOW_CONSUMPTION_BY: "Pokaż zużycie przez",
      SHOW_CONSUMPTION_IN: "Pokaż zużycie w",
      TEST: "Test"
    });

    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.preferredLanguage('en');

  });
