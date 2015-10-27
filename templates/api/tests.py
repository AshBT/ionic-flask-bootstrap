#!/usr/bin/env python2.7

import requests
from json import dumps

headers={'Content-Type': 'application/json'}

{% for endpoint in data.endpoints %}
http_endpoint = "{{ data.base_url}}/api/v1/{{ endpoint.endpoint }}"
data = { {% for kvs in endpoint.kvs %}
    '{{ kvs.key }}' : '{{ kvs.type }}',{% endfor %} 
}

# Test {{ endpoint.endpoint }} POST
print requests.post(http_endpoint, data=dumps(data), headers=headers)

# Test {{ endpoint.endpoint }} GET
print requests.get(http_endpoint)

# Test {{ endpoint.endpoint }} PUT
#print requests.put(http_endpoint)

# Test {{ endpoint.endpoint }} DELETE
#print requests.delete(http_endpoint)

{% endfor %}

