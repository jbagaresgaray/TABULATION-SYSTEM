'use strict';

angular.module('starter')
    .config(function($provide, $httpProvider) {
        $provide.factory('AuthHttpInterceptor', function($q, HOST, $location, $rootScope) {
            return {
                'request': function(config) {
                    if ((new RegExp(HOST)).test(config.url)) {
                        if (config.params != undefined) {
                            config.params.auth_token = localStorage.getItem('form_token');
                        } else {
                            config.params = {
                                'auth_token': localStorage.getItem('form_token')
                            };
                        }
                    }
                    return config || $q.when(config);
                },
                'response': function(response) {
                    return response || $q.when(response);
                },
                'responseError': function(rejection) {
                    if (rejection.status == 401) {
                        localStorage.removeItem('coride_auth_token');
                        $rootScope.$broadcast('app.loggedOut');
                        $location.path('/login');
                    }
                    return $q.reject(rejection);
                }
            };
        });

        $httpProvider.interceptors.push('AuthHttpInterceptor');

    });
