# Welcome to Node Vue Express Socket App

To run this app, please do follow the instructions bellow!


## Requirements

To run this app you need to have node js and mysql installed on your machine.

 - [Node.js](https://nodejs.org/) ^14.16.1
 - [MySQL](https://dev.mysql.com/downloads/) ^5.7.33

## Database

The database config for user, password and database name is located in 

> ./config/config.json

Change it according to your current database settings.
The schema and seed data for the database can be found in 

> ./jts-test-node.sql

### Or

You can use [sequelize-cli](https://www.npmjs.com/package/sequelize-cli) to migrate and seed the database table by running the following command after configuring your database settings.

    npm install -g sequelize-cli
    sequelize db:migrate
    sequelize db:seed:all
  
You might be wondering **"Why should I install the sequelize-cli globally?"**. The thing is, I've tried to install it as dev package but the command line never recognize the sequelize command. Maybe because I'm using windows as my development machine. Or maybe something is wrong with my machine. Or maybe I'm not that good at this subject than I think I am. Feel free to try it though. To install it as a dev package you can use the following command

    npm install --save-dev sequelize-cli

## Dependency

This app requires a few packages or dependencies to run.
You can install it by using the following command

    npm install

## Frontend

This app is a SPA (Single Page Application) built using [Vue](http://vuejs.org). To build the front end you need to run the following command:

    npm run build


## Backend 

The backend of this app leverage [express](https://expressjs.com/)  on top of [Node.js](https://nodejs.org/) runtime to run an http server. To run the app as a whole, you can run the following command from the current (app) directory: 

    node ./bin/www

## Google Auth Client ID

Oops, almost forgot. The current app use my (the developer) google auth client id for the google auth feature.
You can change it to use your own google client id by changing the value of **gauthClientId** in

> ./src/main.js

To acquire your own Google Auth Client ID please visit ["Using OAuth 2.0 to Access Google APIs"](https://developers.google.com/identity/protocols/oauth2)
