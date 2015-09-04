'use strict';

angular.module('starter')
    .controller('AuthCtrl', function($rootScope, $scope, $state, $ionicPlatform, $timeout, AuthService) {

        $scope.$on('app.loggedIn', function(event) {
            console.log('LOGGED IN!');
            $state.go('how-it-works');
        });

        $scope.$on('app.loggedOut', function(event) {
            console.log('NOT LOGGED IN!');
            $state.go('how-it-works');
        });

        $scope.user = {
            'username': '',
            'password': ''
        };

        $scope.login = function() {
            $state.go('login');
            /*User.sign_in({}, {
                    "user": $scope.user
                },
                function(data) {
                    // localStorage.setItem("auth_token", data.auth_token);
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
