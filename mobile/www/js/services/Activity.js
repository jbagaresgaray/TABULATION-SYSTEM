'use strict';

angular.module('starter')
    .factory('Activity', function($http, HOST) {
        return {
            getActivity: function() {
                return $http.get(HOST + '/activities/').then(function(data) {
                    return data;
                });
            },
            getEvents: function(id) {
                return $http.get(HOST + '/events_ext1/' + id).then(function(data) {
                    return data;
                });
            },
            getContestants: function(id) {
                return $http.get(HOST + '/contestants_Ext1/' + id).then(function(data) {
                    return data;
                });
            },
            getCriteria: function(id) {
                return $http.get(HOST + '/criteria_Ext1/' + id).then(function(data) {
                    return data;
                });
            },
            saveScore: function(data) {
                return $http({
                    method: 'POST',
                    type:'json',
                    url: HOST + '/scores/',
                    data: data
                });
            }
        }
    });
