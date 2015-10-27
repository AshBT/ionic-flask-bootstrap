angular.module("{{ data.app_name }}.services", ["ngResource"])

{% for endpoint in data.endpoints %}
.factory("{{ endpoint.endpoint }}", function($resource) {

    return $resource("{{ data.base_url }}/api/v1/{{ endpoint.endpoint }}", {}, {
        post : {
            method : "POST",
            {% for kv in endpoint.kvs %}
            "{{ kv.key }}" : "@{{ kv.key }}"{% if kv.key %},{% endif %}{% endfor %}
        },
        get: {
            method : "GET",
            {% for kv in endpoint.kvs %}
            "{{ kv.key }}" : "@{{ kv.key }}"{% if kv.key %},{% endif %}{% endfor %}
        },
        put : {
            method : "PUT",
            {% for kv in endpoint.kvs %}
            "{{ kv.key }}" : "@{{ kv.key }}"{% if kv.key %},{% endif %}{% endfor %}
        },
        delete : {
            method : "DELETE",
            {% for kv in endpoint.kvs %}
            "{{ kv.key }}" : "@{{ kv.key }}"{% if kv.key %},{% endif %}{% endfor %}
        },
    });
})
{% endfor %}
// Blocks/unblocks UI, and alert message
.factory('Message', function($ionicPopup, $ionicLoading) {

    return {
        show : function(title, data) {
            $ionicPopup.alert({
                title: title,
                template: data
            })
        },
        unblock : function(data) {
            $ionicLoading.hide();
        },
        block : function(data) {
            $ionicLoading.show({
                content: data,
                animation: 'fade-in',
                showBackdrop: true
            });
        }
    }

})
;
