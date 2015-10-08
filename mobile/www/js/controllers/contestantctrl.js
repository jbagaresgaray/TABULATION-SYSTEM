'use strict';

angular.module('starter')
    .controller('ContestantCtrl', function($scope, $window, $ionicModal, $stateParams, $ionicLoading, $ionicScrollDelegate, Activity) {

        function init() {
            $scope.clientSideList = [{
                text: "Male",
                value: "Male"
            }, {
                text: "Female",
                value: "Female"
            }];

            $scope.data = {
                clientSide: 'Male'
            };

            $scope.contestants = [];
            $scope.dataCons = [];

            $ionicLoading.show();
            $scope.eventId = $stateParams.eventId;
            var user = $window.localStorage['users'];
            user = JSON.parse(user);

            Activity.getContestants(user.judgeid, $stateParams.eventId).then(function(data) {
                $scope.contestants = _.filter(data.childs, {
                    'gender': $scope.data.clientSide
                });
                $scope.dataCons = data.childs;
                console.log($scope.contestants);
                $ionicLoading.hide();
            });
        }

        $scope.eventButton = function(value) {
            $scope.data.clientSide = value;
            var val = _.filter($scope.dataCons, {
                'gender': $scope.data.clientSide
            });
            $scope.contestants = val;
            console.log($scope.contestants);
            $ionicScrollDelegate.scrollTop();
            $ionicScrollDelegate.resize();
        };

        $scope.doRefresh = function() {
            $ionicLoading.show();
            $scope.eventId = $stateParams.eventId;
            var user = $window.localStorage['users'];
            user = JSON.parse(user);

            Activity.getContestants(user.judgeid, $stateParams.eventId).then(function(data) {
                $scope.contestants = _.filter(data.childs, {
                    'gender': $scope.data.clientSide
                });
                $scope.dataCons = data.childs;
                console.log($scope.contestants);
                $ionicLoading.hide();
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        init();
    })
    .controller('DetailCtrl', function($scope, $window, $ionicModal, $ionicPopup, $stateParams, $ionicLoading, Activity) {

        function init() {
            console.log('$stateParams id: ', $stateParams.id);
            console.log('$stateParams eventId: ', $stateParams.eventId);

            $scope.total = 0;

            $ionicLoading.show();
            var user = $window.localStorage['users'];
            user = JSON.parse(user);

            Activity.getContestants(user.judgeid, $stateParams.eventId).then(function(data) {
                var result = _.find(data.childs, {
                    'contestantid': $stateParams.id
                })
                console.log('result: ', result);
                $scope.detail = result;

                Activity.getCriteria($stateParams.id).then(function(data) {
                    var total = 0;
                    $scope.criterias = data;
                    for (var i = 0; i < data.childs.length; i++) {
                        total += parseFloat(!_.isNull(data.childs[i].score) ? data.childs[i].score : 0);
                    };
                    $scope.total = total;
                    console.log('citeria', $scope.criterias);
                    $ionicLoading.hide();
                });
            });
        }

        $scope.doRefresh = function() {
            $scope.total = 0;

            $ionicLoading.show();
            var user = $window.localStorage['users'];
            user = JSON.parse(user);

            Activity.getContestants(user.judgeid, $stateParams.eventId).then(function(data) {
                var result = _.find(data.childs, {
                    'contestantid': $stateParams.id
                })
                $scope.detail = result;

                Activity.getCriteria($stateParams.id).then(function(data) {
                    var total = 0;
                    $scope.criterias = data;
                    for (var i = 0; i < data.childs.length; i++) {
                        total += parseFloat(!_.isNull(data.childs[i].score) ? data.childs[i].score : 0);
                    };
                    $scope.total = total;
                    $ionicLoading.hide();
                    $scope.$broadcast('scroll.refreshComplete');
                });
            });
        };

        $scope.showPopup = function(id, percentage, score) {
            $scope.data = {};
            console.log('score: ', score);

            var judge = JSON.parse(localStorage.getItem('users'));

            $scope.data.criteriaid = id;
            $scope.data.contestantid = $stateParams.id;
            $scope.data.judgeid = judge.judgeid;
            $scope.data.eventId = $stateParams.eventId;

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
                            e.preventDefault();
                        }else if($scope.data.scoring > percentage){
                            alert('Score must not be greater than the allocated percentile');
                            e.preventDefault();
                        } else {
                            if (score === undefined || score === null) {
                                Activity.saveScore($scope.data)
                                    .success(function(data) {
                                        setTimeout(function() {
                                            var alertPopup = $ionicPopup.alert({
                                                title: 'Notification',
                                                template: data.msg
                                            });
                                            alertPopup.then(function(res) {
                                                init();
                                            });
                                        }, 50);
                                    });
                            } else {
                                Activity.updateScore($scope.data)
                                    .success(function(data) {
                                        setTimeout(function() {
                                            var alertPopup = $ionicPopup.alert({
                                                title: 'Notification',
                                                template: data.msg
                                            });
                                            alertPopup.then(function(res) {
                                                init();
                                            });
                                        }, 50);
                                    });
                            }
                        }
                    }
                }]
            });
        }

        init();
    });
