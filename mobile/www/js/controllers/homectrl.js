'use strict';

angular.module('starter')
    .controller('HomeCtrl', function($scope, $ionicModal, $ionicPopover, Activity) {

        $scope.changeStyle = function() {
            $scope.isList = ($scope.isList == true) ? false : true;
        };

        $ionicPopover.fromTemplateUrl('templates/popover.html', {
            scope: $scope
        }).then(function(popover) {
            $scope.popover = popover;
        });


        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };

        function init() {
            $scope.isList = ($scope.isList == true) ? false : true;

            Activity.getActivity().then(function(data) {
                $scope.activities = data.data;
            });
        }

        init();
    });
