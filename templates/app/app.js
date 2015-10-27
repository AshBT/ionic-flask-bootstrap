angular.module("{{ data.app_name }}", ["ionic", "{{ data.app_name }}.controllers", "{{ data.app_name }}.services"])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('tab', {
        url: "/tab",
        abstract: true,
        controller : 'appCtrl',
        templateUrl: "templates/tabs.html"
    })

    .state('tab.dash', {
        url: '/dash',
        views: {
            'tab-dash': {
                templateUrl: 'templates/dash.html',
                controller: 'appCtrl'
            }
        }
    })

    {% for endpoint in data.endpoints %}
    .state('tab.{{ endpoint.endpoint }}', {
        url: '/{{ endpoint.endpoint }}',
        views: {
            'tab-{{ endpoint.endpoint }}': {
                templateUrl: 'templates/{{ endpoint.endpoint }}.html',
                controller: '{{ endpoint.endpoint }}Ctrl'
            }
        }
    })

    .state('tab.view{{ endpoint.endpoint }}', {
        url: '/view/{{ endpoint.endpoint }}/:item_id',
        views: {
            'tab-{{ endpoint.endpoint }}': {
                templateUrl: 'templates/view-{{ endpoint.endpoint }}.html',
                controller: '{{ endpoint.endpoint }}Ctrl'
            }
        }
    })

    .state('tab.create{{ endpoint.endpoint }}', {
        url: '/create/{{ endpoint.endpoint }}',
        views: {
            'tab-{{ endpoint.endpoint }}': {
                templateUrl: 'templates/create-{{ endpoint.endpoint }}.html',
                controller: '{{ endpoint.endpoint }}Ctrl'
            }
        }
    })

    .state('tab.edit{{ endpoint.endpoint }}', {
        url: '/edit/{{ endpoint.endpoint }}/:item_id',
        views: {
            'tab-{{ endpoint.endpoint }}': {
                templateUrl: 'templates/edit-{{ endpoint.endpoint }}.html',
                controller: '{{ endpoint.endpoint }}Ctrl'
            }
        }
    })
    {% endfor %}

    $urlRouterProvider.otherwise('/tab/dash');

})

.filter("relative_date", function() {
    return function(date) {
        return moment( date * 1000 ).fromNow();
    }
});
;
