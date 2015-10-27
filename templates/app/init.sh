#!/bin/bash

type node >/dev/null 2>&1 || { echo >&2 "I require node but it's not installed.  Aborting."; exit 1; }
type npm >/dev/null 2>&1 || { echo >&2 "I require npm but it's not installed.  Aborting."; exit 1; }
type ionic >/dev/null 2>&1 || { echo >&2 "I require ionic but it's not installed.  Aborting."; exit 1; }
type bower >/dev/null 2>&1 || { echo >&2 "I require bower but it's not installed.  Aborting."; exit 1; }


# Project workspace setup
mkdir -p ~/Projects/{{ data.app_name }}/tmp
cd Projects/{{ data.app_name }}

# Download build
wget https://serveo.us/ngflask/static/build/{{ data.app_name }}.tar.gz
tar -zxf {{ data.app_name }}.tar.gz -C tmp/
mv tmp/{{ data.app_name }}/api ./api
cd api

# Set up virtual environment
virtualenv venv
. venv/bin/activate

 # Install dependencies for API
pip install -r requirements.txt

# Go back to project root
cd ..

# Setup ionic project
ionic start "{{ data.app_name }}" blank

# Copy mobile build to ionic www directory
rsync -avz tmp/{{ data.app_name }}/app/www/* {{ data.app_name }}/www/

# Change to project root
cd {{ data.app_name }}
ionic platform add android

bower install angular-resource
bower install ngCordova
bower install moment

cd ..
rm -rf {{ data.app_name }}.tar.gz
rm -rf tmp
