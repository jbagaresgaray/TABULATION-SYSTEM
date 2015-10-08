'use strict';

angular.module('starter')
    .controller('AuthCtrl', function($rootScope, $scope, $state, $ionicPopup, $timeout, $ionicLoading, AuthService) {

        $scope.$on('app.loggedIn', function(event) {
            console.log('LOGGED IN!');
            $state.go('app.home');
        });

        $scope.login = function() {
            $ionicLoading.show();
            AuthService.authLogin($scope.user)
                .success(function(data) {
                    console.log('auth: ', data);
                    if (data.success == false) {
                        $ionicLoading.hide();
                        $ionicPopup.alert({
                            title: 'Notification',
                            template: data.msg
                        });
                    } else {
                        $ionicLoading.hide();
                        localStorage.setItem("auth_token", data.form_token);
                        localStorage.setItem("users", JSON.stringify(data.childs));

                        $rootScope.$broadcast('app.loggedIn');
                    }
                })
                .error(function(res) {
                    console.log('error: ', res);
                    $ionicLoading.hide();
                });;
        };

        function init() {
            $scope.user = {
                username: '',
                password: ''
            };

            if (AuthService.checkLogin()) {
                $rootScope.$broadcast('app.loggedIn');
            }
        }

        init();

    });
