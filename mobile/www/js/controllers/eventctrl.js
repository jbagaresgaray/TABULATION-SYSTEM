'use strict';

angular.module('starter')
    .controller('EventCtrl', function($scope, $window, $ionicModal, Activity, $ionicLoading, $stateParams) {

        function init() {
            $ionicLoading.show();
            Activity.getEvents($stateParams.activityId).then(function(data) {
                var user = $window.localStorage['users'];
                user = JSON.parse(user);

                $scope.events = _.filter(data.childs, {
                    'eventid': user.eventid
                });
                console.log($scope.events);

                $ionicLoading.hide();
            });
        }

        $scope.doRefresh = function() {
            $ionicLoading.show();
            Activity.getEvents($stateParams.activityId).then(function(data) {
                var user = $window.localStorage['users'];
                user = JSON.parse(user);

                $scope.events = _.filter(data.childs, {
                    'eventid': user.eventid
                });
                console.log($scope.events);

                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        init();
    });
