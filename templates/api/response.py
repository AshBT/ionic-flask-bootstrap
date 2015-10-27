from flask import Response
from bson.json_util import dumps

def to_json(data, status=200) :
    return Response(dumps(data, encoding="UTF-8"), status=status, mimetype="application/json")

def unauthorized() :
    message = {'success' : False, 'message' : 'Unauthorized'}
    return Response(dumps(message, encoding="UTF-8"), status=401, mimetype="application/json")
