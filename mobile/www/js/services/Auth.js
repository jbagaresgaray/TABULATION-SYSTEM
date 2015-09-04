'use strict';

angular.module('starter')
    .factory('AuthService', function($rootScope,$ionicPopup,HOST) {

        var errorCallback = function(a, b, c, d) {
            $ionicPopup.alert({
                title: 'error',
                template: 'Error'
            });
        };

        return {
            authLogin: function(data){
                return $.ajax({
                    method: 'POST',
                    url: HOST + '/judgeLogin/',
                    data: data
                }).error(errorCallback);
            },
            checkLogin: function() {
                // Check if logged in and fire events
                if (!this.isLoggedIn()) {
                    console.log('checkLogin false');
                    return false;
                    $rootScope.$broadcast('app.loggedOut');
                }else{
                    console.log('checkLogin true');
                    return true;
                }
            },
            isLoggedIn: function() {
                // Check auth token here from localStorage
                if (localStorage.getItem("auth_token") === null || localStorage.getItem("auth_token") === "undefined" || localStorage.getItem("auth_token") === '') {
                     console.log('isLoggedIn false');
                    return false
                } else {
                    console.log('isLoggedIn true');
                    return true
                };
            },
            logout: function(email, pass) {
                // Same thing, log out user
                $rootScope.$broadcast('app.loggedOut');
            }
        }
    });
