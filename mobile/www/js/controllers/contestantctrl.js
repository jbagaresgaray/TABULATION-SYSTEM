'use strict';

angular.module('starter')
    .controller('ContestantCtrl', function($scope, $ionicModal, $stateParams, Activity) {

        function init() {

            Activity.getContestants($stateParams.eventId).then(function(data) {
                $scope.contestants = data.data;
                console.log($scope.contestants);
            });
        }

        init();
    })
    .controller('DetailCtrl', function($scope, $ionicModal, $ionicPopup, $stateParams, Activity) {

        function init() {
            console.log('$stateParams: ', $stateParams.id);

            /*Activity.getContestants($stateParams.id).then(function(data) {

                $scope.detail = data.data;
            });*/

            Activity.getCriteria($stateParams.id).then(function(data) {

                $scope.criterias = data.data;
                console.log('citeria',$scope.criterias);
            });

            /*$scope.criterias = [{
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
            }]*/

        }

        $scope.showPopup = function(id) {
            $scope.data = {}
            console.log($stateParams.id);
            // An elaborate, custom popup
            $scope.data.criteriaid = id;
            $scope.data.contestantid = $stateParams.id;

            var myPopup = $ionicPopup.show({
                template: '<input type="number" ng-model="data.scoring">',
                title: 'Enter Score / Rating',
                scope: $scope,
                buttons: [{
                    text: 'Cancel'
                }, {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.data.scoring) {
                            //don't allow the user to close unless he enters wifi password
                            e.preventDefault();
                        } else {
                            Activity.saveScore($scope.data)
                            .success(function(data, status, headers, config){
                                console.log('resp: ',data);
                            });
                        }
                    }
                }]
            });
        }

        init();
    });
