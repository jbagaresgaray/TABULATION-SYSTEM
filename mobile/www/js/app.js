'use strict';

angular.module('starter', ['ionic', 'ngResource'])
    .constant('HOST', 'http://tabulation.comoj.com/theme/templates/server') //PRODUCTION
    // .constant('HOST', 'http://192.168.1.34/TABULATION-SYSTEM/theme/templates/server') //DEVELOPMENT
    // .constant('HOST', 'http://localhost/TABULATION-SYSTEM/theme/templates/server') //STAGING
    .run(function($ionicPlatform, $location,$state,$rootScope, AuthService) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });

        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
            if (toState.authRequired && !AuthService.checkLogin()) { //Assuming the AuthService holds authentication logic
                // User isn’t authenticated
                $state.transitionTo("login");
                event.preventDefault();
            }
        });
    });
