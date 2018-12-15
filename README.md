# [Tribune](https://djreact-tribune.herokuapp.com)
### Post it here!
### December 15th, 2018
#### By **[Richard Waweru](https://github.com/devwaweru)**

## Table of Contents

- [Description](#description)
- [Set-up and Installations](#set-up-and-installations)
  - [Pre-Requisites](#pre-requisites)
  - [Clone Repository](#clone-repository)
  - [Activate virtual environment](#activate-virtual-environment)
  - [Install Dependencies](#install-dependencies)
  - [Create Postgresql Database](#create-postgresql-database)
  - [Create .env file](#create-env-file)
  - [Run migrations](#run-migrations)
  - [Run app](#run-app)
- [Technologies used](#technologies-used)
- [Support and contact details](#support-and-contact-details)
- [License](#license)

## Description

Tribune displays user posts/articles. It is created using react in the front-end and django handles the backend.
It is a bare minimal application showing how front-end React library can be used with Django as a backend application.

## Set-up and Installations
### Pre-Requisites
1. Python 3.6
2. Node Js 
3. npm
4. Postgresql
5. Virtual Environment

### Clone Repository
Run in terminal `git clone https://github.com/DevWaweru/Tribune-rd.git && cd Tribune-rd` to clone repo

### Activate virtual environment
Create a virtual environment using python-3.6 and activate
```bash
virtualenv -p python3.6 venv && source venv/bin/activate
```

### Install dependecies
Since the app runs on two buildpacks, React and Django, two commands will be required to install dependencies.
React dependencies:
```bash
npm i
```
Django dependencies:
```bash
pip3 install -r requirements.txt
```

### Create postgresql database
```bash
psql
create database tribune-rd
```

### Create env file
Use the [.env(sample)](https://github.com/DevWaweru/Tribune-rd/blob/master/.env(sample)) to create a .env file

### Run migrations
```bash
python manager migrate
```
### Run app
At this point, react application and django applications coexists independently. Running `python manage.py runserver` will start the application but will bring the template not found error in the browser. This is solved by running `npm run build` which creates a build folder with the index.html file to render

For development mode however, running the two apps seperately will cause less headaches since you will not have to run `npm run build` everytime you make changes.

Open localhost for react application
```bash
npm start
```

open localhost for django application
```bash
python manage.py runserver
```

## Technologies used
- Python3.6
- Django framework
- React JS
- Postgresql
- Heroku

## Support and contact details
Contact me on developer.waweru@gmail.com for any comments, reviews or advice.

## License
Copyright (c) **Richard Waweru**