import os, sys
from flask.ext.script import Manager
from {{ data.app_name }} import app
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

manager = Manager(app)

if __name__ == '__main__' :
    manager.run()

