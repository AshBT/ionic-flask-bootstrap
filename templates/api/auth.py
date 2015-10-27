from flask import request
from {{ data.app_name }}.db import db
from uuid import uuid4
from werkzeug.security import generate_password_hash, check_password_hash

def check_login(email, password) :
    user = db.users.find_one({'email' : email})
    if user :
        pw_hash = user.get('password')
        result = check_password_hash(pw_hash, password)
        del(user['password'], user['nonce'], user['_id'], user['email'], user['roles'])
        if result : return user 
    return False
    

def check_token() :
    # Unauthenticated endpoints
    public_endpoints = ['login', 'register']
    endpoint = str(request.url_rule).split('/')[-1]
    print endpoint
    if endpoint in public_endpoints :
        return True
    token = request.headers.get('X-Usertoken')
    user = db.users.find_one({'token' : token})
    if user :
        return user.get('roles')
    return False

def create(email, password) :
    pw_hash = generate_password_hash(password)
    token = str(uuid4())
    data = {
        'email'     : email,
        'password'  : pw_hash,
        'token'     : token,
        'nonce'     : str(uuid4()),
        'roles'     : ['user']
    }
    db.users.insert(data)
    return {'token' : token}
