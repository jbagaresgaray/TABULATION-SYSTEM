'use strict';

angular.module('starter')
    .controller('EventCtrl', function($scope, $ionicModal, Activity, $ionicLoading, $stateParams) {

        function init() {
            $ionicLoading.show();
            Activity.getEvents($stateParams.activityId).then(function(data) {
                $scope.events = data;
                console.log($scope.events);
                $ionicLoading.hide();
            });
        }

        $scope.doRefresh = function() {
            $ionicLoading.show();
            Activity.getEvents($stateParams.activityId).then(function(data) {
                $scope.events = data;
                console.log($scope.events);
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        init();
    });
