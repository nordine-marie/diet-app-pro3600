var myApp = angular.module('myApp', ['ui.router','ngCookies','chart.js']);


myApp.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

      .state('cart', {
       url: '/cart',
       templateUrl: 'cart/cart.html'
    })

    .state('scan', {
       url: '/scan',
       templateUrl: 'scan/scan.html'
    })

    .state('help', {
       url: '/help',
       templateUrl: 'help/help.html'
    })

    .state('settings', {
       url: '/settings',
       templateUrl: 'settings/settings.html'
    })

    .state('advice', {
        url: '/advice',
        templateUrl: 'advice/advice.html'
    })

    .state('search', {
       url: '/search',
       templateUrl: 'search/search.html'
    });

    $urlRouterProvider.otherwise('cart');

});
