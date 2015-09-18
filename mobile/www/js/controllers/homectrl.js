'use strict';

angular.module('starter')
    .controller('HomeCtrl', function($scope, $rootScope, $state, $ionicModal, $ionicPopover, $ionicLoading, Activity) {

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

        $scope.doRefresh = function() {
            $ionicLoading.show();
            Activity.getActivity().then(function(data) {
                $scope.activities = data;
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        function init() {
            $ionicLoading.show();
            Activity.getActivity().then(function(data) {
                $scope.activities = data;
                $ionicLoading.hide();
            });
        }

        init();
    });
