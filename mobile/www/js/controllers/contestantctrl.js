'use strict';

angular.module('starter')
    .controller('ContestantCtrl', function($scope, $ionicModal, Activity) {

        function init() {

            Activity.getContestants().then(function(data) {
                $scope.contestants = data.data;
            });
        }

        init();
    })
    .controller('DetailCtrl', function($scope, $ionicModal, $ionicPopup, $stateParams, Activity) {

        function init() {
            console.log('$stateParams: ', $stateParams.id);

            Activity.getContestants().then(function(data) {

                $scope.detail = data.data;
            });

            $scope.criterias = [{
                name: "Beauty",
                percent: 20
            }, {
                name: "Stage Presence",
                percent: 20
            }, {
                name: "Charm",
                percent: 20
            }, {
                name: "Q and A",
                percent: 20
            }, {
                name: "Biniga Style",
                percent: 20
            }]

        }

        $scope.showPopup = function() {
            $scope.data = {}

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<input type="number" ng-model="scoring">',
                title: 'Enter Score / Rating',
                scope: $scope,
                buttons: [{
                    text: 'Cancel'
                }, {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.data.wifi) {
                            //don't allow the user to close unless he enters wifi password
                            e.preventDefault();
                        } else {
                            return $scope.data.wifi;
                        }
                    }
                }]
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
        };

        init();
    });
