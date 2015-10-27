angular.module("{{ data.app_name }}.controllers", [])

.controller("appCtrl", function($scope) {

})
{% for endpoint in data.endpoints %}
.controller("{{ endpoint.endpoint }}Ctrl", function($scope, $state, $stateParams, {{ endpoint.endpoint }}, Message) {

    var params = {};
    var total_pages = 1;
    params.page = 1;

    // ObjectId in get params
    params.item_id = $stateParams.item_id;

    // Infinitee scroll autoload for {{ endpoint.endpoint }}
    $scope.results = [];

    if (params.item_id) {
        {{ endpoint.endpoint }}.get(params, function(data) {
            total_pages = data.meta.pages;
            params.page++;
            $scope.meta = data.meta;
            $scope.results = $scope.results.concat(data.results);
        });
    };

    $scope.infinite_scroll = function() {

        if (params.page > total_pages) {
            $scope.$broadcast('scroll.infiniteScrollComplete');
            $scope.$broadcast('scroll.resize');
            return false;
        };

        {{ endpoint.endpoint }}.get(params, function(data) {
            total_pages = data.meta.pages;
            params.page++;
            $scope.meta = data.meta;
            $scope.results = $scope.results.concat(data.results);
        });

        $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.$broadcast('scroll.resize');

    };

    // Pull down to refresh
    $scope.get_latest = function() {
        {{ endpoint.endpoint }}.get(function(data) {
            params.page = 0;
            $scope.meta = data.meta;
            $scope.results = data.results;
            $scope.$broadcast('scroll.resize');
            $scope.$broadcast('scroll.refreshComplete');
        });
    };

    // Save a {{ endpoint.endpoint }}
    $scope.post = function(formdata) {
        Message.block();
        {{ endpoint.endpoint }}.post(formdata, function(data) {
            $scope.data = data;
            Message.unblock();
            $state.go('tab.{{ endpoint.endpoint }}');
        });
    };

    // Put a {{ endpoint.endpoint }}
    $scope.put = function(formdata) {
        Message.block();
        {{ endpoint.endpoint }}.put(formdata, function(data) {
            $scope.data = data;
            Message.unblock();
        });
    };

    // Delete a {{ endpoint.endpoint }}
    $scope.delete = function() {
        Message.block();
        {{ endpoint.endpoint }}.delete(params, function(data) {
            $scope.data = data;
            Message.unblock();
            $state.go('tab.{{ endpoint.endpoint }}');
        });
    };

})
{% endfor %}
;
