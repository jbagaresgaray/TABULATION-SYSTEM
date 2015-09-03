'use strict';

angular.module('starter')
    .controller('EventCtrl', function($scope, $ionicModal, Activity, $stateParams) {
        function chunk(arr, size) {
            var newArr = [];
            for (var i = 0; i < arr.length; i += size) {
                newArr.push(arr.slice(i, i + size));
            }
            return newArr;
        }

        $scope.changeStyle = function() {
            $scope.isList = ($scope.isList == true) ? false : true;
        };

        function init() {
            $scope.isList = ($scope.isList == true) ? false : true;

            Activity.getEvents($stateParams.activityId).then(function(data) {
                $scope.events = data.data;
                $scope.chunkedData = chunk(data.data, 2);
                console.log($scope.events);
            });
        }

        init();
    });
