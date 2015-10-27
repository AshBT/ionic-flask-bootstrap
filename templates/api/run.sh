export APP_SETTINGS=`pwd`/config.ini
source venv/bin/activate
python manage.py runserver --host="0.0.0.0"

