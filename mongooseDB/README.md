This directory contains one express servers:
* index.ts - Encapsulated Node/Express web server w/ Mongo Access

File content:
- models folder: contains all the schemas, and models of the collections
- interfaces folder: contains all the interfaces of the collections
- App.ts: This contains all the code related to the routes and express server configuration
- AppServer.ts: This contains the code used to start the server at port 8080

Make sure you install the node.js server and Mongo DB sofware from the side.  Ensure your path variable contains the execution path of the node.js and mongo binary.

Make sure to start mongodb server before running following commands:
    /Users/shipravalecha/Desktop/mongodb/bin/mongod --dbpath=/Users/shipravalecha/Desktop/mongodb-data

To load scripts: 

- To connect to attendance-tracker db server on 27017
    /Users/shipravalecha/Desktop/mongodb/bin/mongod -port 27017 --dbpath=/Users/shipravalecha/Desktop/mongodb-data

- In new terminal, go to path mongodb and run below commands: 
    ./mongo --port 27017 --authenticationDatabase admin
    load ('/Users/shipravalecha/Desktop/Seattle University/SaaS/Team3App/CPSC-4240-Team3/mongooseDB/src/createDB/AttendanceDatacopy.js');
    exit

1. install prerequisites: npm install

2. compile all the files in model folder, for e.g.
    tsc src/models/user.ts

3. compile DataAccess.ts file
    tsc DataAccess.ts

4. compile AppServer.ts file
    tsc src/AppServer.ts

5. Execute Node/Express server on port 8080
    node AppServer.js

To test server, try the following URL on the browser, while the server is running:
* http://localhost:8080/


STEPS TO ADD OAUTH SSO TO PROJECT

Install passport package
    npm install passport

Install google auth
    npm install passport-google-oauth

For Google Oauth, open Google cloud platform and create a new Project
    https://console.developers.google.com/apis/dashboard 

Enable APIs and Services by adding Google+ API
    Select Enable on the Google+ API

Add credentials to your project from the dropdown, select the OAuth Client ID
    Create your .env file to add your creds

Configure the consent screen with the information about the web application

Select the Web application.Give the 2 URLs http and https in authorized redirected URIs
    http://localhost:8080/api/account/google

Then run below commands:
npm install cookie-session 
npm install passport 
npm install passport-google-oauth20 --save

OR 

npm install (to load all the dependencies)


