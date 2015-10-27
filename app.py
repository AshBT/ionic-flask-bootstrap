from flask import Flask, Response, send_file, request, render_template
from bson.json_util import dumps
import requests
import os, shutil
from uuid import uuid4
import re
from pprint import pprint
import tarfile

app = Flask(__name__)

def respond(data, status=200) :
    return Response(dumps(data, encoding="UTF-8"), status=status, mimetype="application/json")

def gen_views(data) :
    return render_template('app/view.html', data=data)


@app.route('/')
def index() :
    return send_file('static/app.html')

@app.route('/build', methods=['POST'])
def build() :
    data = request.get_json()
    app_title = data.get('name')
    app_name = re.sub(r'\W+', '', data.get('name')).lower()
    """
    try :
        shutil.rmtree('builds/%s' % app_name)
    except :
        pass
    """
    data.update({'app_name':app_name})

    # Make API directories
    api_path = 'builds/%s/api' % app_name
    package_path = "%s/%s" % (api_path, app_name)

    try :
        os.makedirs("%s/helpers" % package_path)
        os.makedirs("%s/api" % package_path)
    except :
        pass

    shutil.copyfile('templates/api/gitignore', "%s/.gitignore" % api_path)
    shutil.copyfile('templates/api/requirements.txt', "%s/requirements.txt" % api_path)
    shutil.copyfile('templates/api/run.sh', "%s/run.sh" % api_path)
    shutil.copyfile('templates/api/response.py', "%s/helpers/response.py" % package_path)

    # Empty inits for modules
    with open("%s/api/__init__.py" % package_path, 'a') as fh : fh.close()
    with open("%s/helpers/__init__.py" % package_path, 'a') as fh : fh.close()

    # Python template population
    test_data = render_template('api/tests.py', data=data)
    with open(api_path+'/tests.py', 'wb') as fh :
        fh.write(test_data)
        fh.close()

    api_data = render_template('api/views.py', data=data)
    with open(package_path+'/api/views.py', 'wb') as fh :
        fh.write(api_data)
        fh.close()

    config_data = render_template('api/config.ini', data=data)
    with open(api_path+'/config.ini', 'wb') as fh :
        fh.write(config_data)
        fh.close()

    manage_data = render_template('api/manage.py', data=data)
    with open(api_path+'/manage.py', 'wb') as fh :
        fh.write(manage_data)
        fh.close()

    db_data = render_template('api/db.py', data=data)
    with open(package_path+'/db.py', 'wb') as fh :
        fh.write(db_data)
        fh.close()

    init_data = render_template('api/__init__.py', data=data)
    with open(package_path+'/__init__.py', 'wb') as fh :
        fh.write(init_data)
        fh.close()

    auth_data = render_template('api/auth.py', data=data)
    with open(package_path+'/helpers/auth.py', 'wb') as fh :
        fh.write(auth_data)
        fh.close()


    # Ionic app structure
    app_path = "builds/%s" % app_name
    www_path = "builds/%s/app/www" % app_name
    # Create project if the dir doesn't already exist
    if not os.path.exists('builds/%s/app' % app_name) :
        print os.system("ionic start --appname='%s' 'builds/%s/app' blank" % (app_title, app_name))
        shutil.copyfile('templates/app/bower.json', "%s/app/bower.json" % app_path)
        print os.system("cd builds/%s/app && bower install" % app_name)

    try :
        os.makedirs('builds/%s/app/www/templates' % app_name)
    except :
        pass

    index_data = render_template('app/index.html', data=data)
    with open(www_path+'/index.html', 'wb') as fh :
        fh.write(index_data)
        fh.close()

    nav_data = render_template('app/tabs.html', data=data)
    with open(www_path+'/templates/tabs.html', 'wb') as fh :
        fh.write(nav_data)
        fh.close()

    dash_data = render_template('app/dashboard.html')
    with open(www_path+'/templates/dash.html', 'wb') as fh :
        fh.write(dash_data)
        fh.close()

    app_data = render_template('app/app.js', data=data)
    with open(www_path+'/js/app.js', 'wb') as fh :
        fh.write(app_data)
        fh.close()

    controller_data =  render_template('app/controllers.js', data=data)
    with open(www_path+'/js/controllers.js', 'wb') as fh :
        fh.write(controller_data)
        fh.close()

    service_data = render_template('app/services.js', data=data)
    with open(www_path+'/js/services.js', 'wb') as fh :
        fh.write(service_data)
        fh.close()

    output = {'endpoints' : []}

    for endpoint in data['endpoints'] :

        view_data = render_template('app/list.html', data=endpoint)
        try :
            ep = endpoint['endpoint']
        except :
            pass
        with open(www_path+"/templates/"+ep+".html", 'wb') as fh :
            fh.write(view_data)
            fh.close()
        output['endpoints'].append({'html' : view_data, 'name' : "%s.html" % ep})

        view_data = render_template('app/view.html', data=endpoint)
        with open(www_path+"/templates/view-"+ep+".html", 'wb') as fh :
            fh.write(view_data)
            fh.close()
        output['endpoints'].append({'html' : view_data, 'name' : "view-%s.html" % ep})

        view_data = render_template('app/create.html', data=endpoint)
        with open(www_path+"/templates/create-"+ep+".html", 'wb') as fh :
            fh.write(view_data)
            fh.close()
        output['endpoints'].append({'html' : view_data, 'name' : "create-%s.html" % ep})

        view_data = render_template('app/edit.html', data=endpoint)
        with open(www_path+"/templates/edit-"+ep+".html", 'wb') as fh :
            fh.write(view_data)
            fh.close()
        output['endpoints'].append({'html' : view_data, 'name' : "edit-%s.html" % ep})

    script_data = render_template('app/init.sh', data=data)

    # Build the gzip
    tar_file = "static/build/%s.tar.gz" % app_name
    tar = tarfile.open(tar_file, "w:gz")
    tar.add("builds/%s" % app_name, arcname=app_name)
    tar.close()

    # Ionic template population
    output.update({
        'index' : index_data,
        'service' : service_data,
        'controller' : controller_data, 
        'app' : app_data,
        'api' : api_data,
        'script' : script_data,
        'nav' : nav_data,
        'tests' : test_data,
        'tarfile' : tar_file
    })

    return respond(output)


if __name__ == '__main__' :
    app.debug = True
    app.run(port=9999, host="0.0.0.0")
