'use strict';

angular.module('starter')
    .controller('TermsCtrl', function($scope, $location) {
        $scope.back = function() {
            window.history.back();
        };
    })
    .controller('ContactCtrl', function($scope, $location) {
        $scope.back = function() {
            window.history.back();
        };
    })
    .controller('PrivacyCtrl', function($scope, $location) {
        $scope.back = function() {
            window.history.back();
        };
    });
