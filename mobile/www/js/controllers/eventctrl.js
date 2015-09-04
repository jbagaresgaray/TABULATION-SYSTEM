'use strict';

angular.module('starter')
    .controller('EventCtrl', function($scope, $ionicModal, Activity, $stateParams) {

        function init() {
            Activity.getEvents($stateParams.activityId).then(function(data) {
                $scope.events = data.data;
                console.log($scope.events);
            });
        }

        init();
    });
