'use strict';

angular.module('starter')
    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $httpProvider.defaults.transformRequest = function(data) {
            if (data === undefined) {
                return data;
            }
            return $.param(data);
        }

        $stateProvider
            .state('how-it-works', {
                url: '/how-it-works',
                templateUrl: 'templates/how-it-works.html',
                controller: 'TutorialCtrl',
                authRequired: true
            })

        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'AuthCtrl'
        })

        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html",
            controller: 'HomeCtrl'
        })

        .state('app.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'templates/home.html',
                    controller: 'HomeCtrl',
                    authRequired: true
                }
            }
        })

        .state('app.events', {
            url: '/events/:activityId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/events.html',
                    controller: 'EventCtrl',
                    authRequired: true
                }
            }
        })

        .state('app.contestants', {
            url: '/contestants/:eventId',
            views: {
                'menuContent': {
                    templateUrl: 'templates/contestants.html',
                    controller: 'ContestantCtrl',
                    authRequired: true
                }
            }
        })

        .state('app.detail', {
            url: '/detail/:eventId/:id',
            views: {
                'menuContent': {
                    templateUrl: 'templates/detail.html',
                    controller: 'DetailCtrl',
                    authRequired: true
                }
            }
        })

        .state('app.privacy', {
            url: '/privacy',
            views: {
                'menuContent': {
                    templateUrl: 'templates/privacy.html',
                    controller: 'PrivacyCtrl',
                }
            }
        })

        .state('app.terms', {
            url: '/terms',
            views: {
                'menuContent': {
                    templateUrl: 'templates/terms.html',
                    controller: 'TermsCtrl'
                }
            }
        })

        .state('app.contact', {
            url: '/contact',
            views: {
                'menuContent': {
                    templateUrl: 'templates/contact.html',
                    controller: 'ContactCtrl'

                }
            }
        })

        $urlRouterProvider.otherwise('/login');

    })
