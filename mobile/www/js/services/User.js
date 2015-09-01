'use strict';

angular.module('starter')
    .factory('User', function($resource, HOST) {
        return $resource(HOST + '/users/:id', {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            },
            sign_up: {
                url: HOST + '/users',
                method: 'POST',
                isArray: false
            },
            sign_in: {
                url: HOST + '/users/sign_in',
                method: 'POST',
                isArray: false
            },
            sign_out: {
                url: HOST + '/users/sign_out',
                method: 'POST',
                isArray: false
            },
            cancel: {
                url: HOST + '/users/cancel',
                method: 'GET',
                isArray: false
            }
        })
    });
