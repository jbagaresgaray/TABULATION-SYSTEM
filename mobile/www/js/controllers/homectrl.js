'use strict';

angular.module('starter')
    .controller('HomeCtrl', function($scope, $rootScope, $state, $ionicModal, $ionicPopover, Activity) {

        $scope.$on('app.loggedOut', function(event) {
            console.log('NOT LOGGED IN!');
            localStorage.setItem("auth_token", '');
            localStorage.setItem("users", '');
            $state.go('login');
        });

        $scope.tutorial = function() {
            $state.go('how-it-works');
        };

        $scope.logout = function() {
            console.log('app.loggedOut');
            $rootScope.$broadcast('app.loggedOut');
        };

        function init() {
            Activity.getActivity().then(function(data) {
                $scope.activities = data.data;
            });
        }

        init();
    });
