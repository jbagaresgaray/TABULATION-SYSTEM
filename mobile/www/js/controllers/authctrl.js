'use strict';

angular.module('starter')
    .controller('AuthCtrl', function($rootScope, $scope, $state, $location, $ionicPlatform, $timeout, Authentication) {

        $scope.$on('app.loggedIn', function(event) {
            console.log('LOGGED IN!');
            $location.path("/tab/destinations");
            $ionicPlatform.ready(function() {
                navigator.splashscreen.hide();
            });
        });

        $scope.$on('app.loggedOut', function(event) {
            console.log('NOT LOGGED IN!');
            $ionicPlatform.ready(function() {
                // navigator.splashscreen.hide();
            });
        });

        $scope.user = {
            'email': '',
            'password': ''
        };

        $scope.login = function() {
            $state.go('how-it-works');
            /*User.sign_in({}, {
                    "user": $scope.user
                },
                function(data) {
                    // localStorage.setItem("coride_auth_token", data.auth_token);
                    $location.path("/how-it-works");
                },
                function(data) {
                    var message = data.data.error
                    console.log(message);
                    navigator.notification.alert(message, null, 'Alert', 'OK');
                }
            );*/
        };

        $scope.register = function() {
            $location.path("/register");
        };

    });
