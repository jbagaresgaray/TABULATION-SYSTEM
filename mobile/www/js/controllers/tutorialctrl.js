'use strict';

angular.module('starter')
    .controller('TutorialCtrl', function($rootScope,$state, $scope, $ionicSlideBoxDelegate) {
        // Called to navigate to back
        $scope.back = function() {
            // Set a flag that we finished the tutorial
            $state.go('app.home');
        };

        // Move to the next slide
        $scope.next = function() {
            $ionicSlideBoxDelegate.next();
        };

        $scope.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        // Called each time the slide changes
        $scope.slideChanged = function(index) {
            $scope.slideIndex = index;
        };
    });
