'use strict';

angular.module('starter')
    .controller('HomeCtrl', function($scope, $state, $ionicModal, $ionicPopover, Activity) {

        $scope.changeStyle = function() {
            $scope.isList = ($scope.isList == true) ? false : true;
        };


        $scope.openPopover = function($event) {
            $scope.popover.show($event);
        };
        $scope.closePopover = function() {
            $scope.popover.hide();
        };

        $scope.tutorial = function() {
            $state.go('how-it-works');
        };

        function init() {
            $ionicPopover.fromTemplateUrl('templates/popover.html', {
                scope: $scope
            }).then(function(popover) {
                $scope.popover = popover;
            });

            Activity.getActivity().then(function(data) {
                $scope.activities = data.data;
            });
        }

        init();
    });
