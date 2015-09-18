'use strict';

angular.module('starter')
    .factory('AuthService', function($rootScope,$ionicPopup,$ionicLoading,$http,HOST) {

        var errorCallback = function(a, b, c, d) {
            console.log('a: ',a);
            console.log('b: ',b);
            console.log('c: ',c);
            console.log('d: ',d);

            $ionicPopup.alert({
                title: 'error',
                template: 'Error'
            });
            $ionicLoading.hide();
        };

        return {
            authLogin: function(data){
                return $.ajax({
                    method: 'POST',
                    url: HOST + '/judgeLogin/',
                    data: data
                })
                .success(function(res){
                    return res;
                })
                .error(errorCallback);
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
