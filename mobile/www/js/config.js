'use strict';

angular.module('starter')
    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {

        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $stateProvider
            .state('how-it-works', {
                url: '/how-it-works',
                templateUrl: 'templates/how-it-works.html',
                controller: 'TutorialCtrl'
            })

        .state('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'AuthCtrl'
        })

        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller: 'HomeCtrl'
        })

        .state('events', {
            url: '/events/:activityId',
            templateUrl: 'templates/events.html',
            controller: 'EventCtrl'
        })

        .state('contestants', {
            url: '/contestants/:eventId',
            templateUrl: 'templates/contestants.html',
            controller: 'ContestantCtrl'
        })

        .state('detail', {
            url: '/detail/:eventId/:id',
            templateUrl: 'templates/detail.html',
            controller: 'DetailCtrl'
        })

        .state('privacy', {
            url: '/privacy',
            templateUrl: 'templates/privacy.html',
            controller: 'PrivacyCtrl'
        })

        .state('terms', {
            url: '/terms',
            templateUrl: 'templates/terms.html',
            controller: 'TermsCtrl'
        })

        .state('contact', {
            url: '/contact',
            templateUrl: 'templates/contact.html',
            controller: 'ContactCtrl'
        })

        $urlRouterProvider.otherwise('/login');

    })
