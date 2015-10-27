from flask import Blueprint, Response, request
from pymongo import DESCENDING, ASCENDING
from {{ data.app_name }}.helpers import response, auth
from {{ data.app_name }}.db import db, hateos
from time import time
from bson import ObjectId

api = Blueprint('api', __name__)

{% for endpoint in data.endpoints %}
@api.route('/{{ endpoint.endpoint }}', methods=['POST', 'GET','PUT','DELETE'])
def {{ endpoint.endpoint }}() :

    db.{{ endpoint.endpoint }}.create_index([("created", DESCENDING)])
    data = request.get_json()

    # Try to get the item_id from at least somewhere
    try :
        item_id = request.form.get('item_id')
    except :
        item_id = data.get('item_id')
    finally :
        item_id = request.args.get('item_id')

    # @TODO clean this up -- Pagination functionality
    try :
        limit = int(request.args.get('limit'))
    except :
        limit = 25

    try :
        page = int(request.args.get('page'))
    except :
        skip_rows = 0
        page = 1

    if page > 1 :
        skip_rows = page
    else :
        skip_rows = 0

    if item_id is not None :
        item_id = ObjectId(item_id)

    if request.method == 'GET' and item_id :
        return response.to_json(hateos(db.{{ endpoint.endpoint }}.find({'_id' : item_id})))

    if request.method == 'POST' :
        data.update({'created' : int(time())})
        db.{{ endpoint.endpoint }}.insert_one(data)

    if request.method == 'PUT' :
        criteria = {'_id' : item_id}
        insert = {'$set' : data}
        db.{{ endpoint.endpoint }}.update_one(criteria, insert)

    if request.method == 'DELETE' :
        criteria = {'_id' : item_id}
        db.{{ endpoint.endpoint }}.delete_one(criteria)

    return response.to_json(hateos(db.{{ endpoint.endpoint }}.find().skip(skip_rows).sort([('created', DESCENDING)]).limit(limit)))

{% endfor %}
