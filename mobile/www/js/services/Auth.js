'use strict';

angular.module('starter')
    .factory('AuthService', function($rootScope, User, HOST) {
        return {
            checkLogin: function() {
                // Check if logged in and fire events
                if (this.isLoggedIn()) {
                    $rootScope.$broadcast('app.loggedIn');
                } else {
                    $rootScope.$broadcast('app.loggedOut');
                }
            },
            isLoggedIn: function() {
                // Check auth token here from localStorage
                if (localStorage.getItem("coride_auth_token") === null || localStorage.getItem("coride_auth_token") === "undefined") {
                    return false
                } else {
                    return true
                };
            },
            logout: function(email, pass) {
                // Same thing, log out user
                $rootScope.$broadcast('app.loggedOut');
            }
        }
    })
    .factory('Authentication', function($resource, HOST) {
        return $resource(HOST + '/authentications/:id', {
            id: '@id'
        })
    });
