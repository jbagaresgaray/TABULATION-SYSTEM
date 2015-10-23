'use strict';

angular.module('starter')
    .factory('Activity', function($http, $ionicPopup, HOST) {

        var errorCallback = function(a, b, c, d) {
            $ionicPopup.alert({
                title: 'error',
                template: 'Error'
            });
        };

        return {
            getActivity: function() {
                return $.ajax({
                    method: 'GET',
                    url: HOST + '/activities/'
                }).error(errorCallback);

                /*return $http.get(HOST + '/activities/').then(function(data) {
                    return data;
                });*/
            },
            getEvents: function(id) {
                return $.ajax({
                    method: 'GET',
                    url: HOST + '/events_ext1/index.php/' + id
                }).error(errorCallback);

                /*return $http.get(HOST + '/events_ext1/' + id).then(function(data) {
                    return data;
                });*/
            },
            getContestants: function(userId,id) {
                return $.ajax({
                    method: 'GET',
                    url: HOST + '/contestants_Ext1/index.php/' + id + '-' + userId
                }).error(errorCallback);

                /*return $http.get(HOST + '/contestants_Ext1/' + id).then(function(data) {
                    return data;
                });*/
            },
            getCriteria: function(id) {
                return $.ajax({
                    method: 'GET',
                    url: HOST + '/criteria_Ext1/index.php/' + id
                }).error(errorCallback);

                /*return $http.get(HOST + '/criteria_Ext1/' + id).then(function(data) {
                    return data;
                });*/
            },
            saveScore: function(data) {
                return $.ajax({
                    method: 'POST',
                    url: HOST + '/scores/',
                    data: data
                }).error(errorCallback);
            },
            updateScore: function(data) {
                return $.ajax({
                    method: 'PUT',
                    url: HOST + '/scores/',
                    data: data
                }).error(errorCallback);
            }
        }
    });
