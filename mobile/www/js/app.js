'use strict';

angular.module('starter', ['ionic','ngResource'])
    .constant('HOST', 'http://localhost/TABULATION-SYSTEM/theme/templates/server') //PRODUCTION
    .run(function($ionicPlatform,$location,$rootScope) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    });
