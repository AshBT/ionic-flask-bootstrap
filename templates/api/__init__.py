from flask import Flask
from {{ data.app_name }}.api.views import api

app = Flask(__name__)
app.config.from_envvar('APP_SETTINGS')

app.register_blueprint(api, url_prefix="/api/v1")

