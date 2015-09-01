'use strict';

angular.module('starter')
    .factory('Activity', function($http, HOST) {
        return {
            getActivity: function() {
                return $http.get('js/values/activity.json').then(function(data) {
                    return data;
                });
            },
            getEvents: function() {
                return $http.get('js/values/events.json').then(function(data) {
                    return data;
                });
            },
            getContestants: function() {
                return $http.get('js/values/contestants.json').then(function(data) {
                    return data;
                });
            }
        }
    });
