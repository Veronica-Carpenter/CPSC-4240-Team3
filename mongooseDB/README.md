This directory contains one express servers:
* index.ts - Encapsulated Node/Express web server w/ Mongo Access

File content:
- models folder: contains all the schemas, and models of the collections
- interfaces folder: contains all the interfaces of the collections
- App.ts: This contains all the code related to the routes and express server configuration
- AppServer.ts: This contains the code used to start the server at port 8080

Make sure you install the node.js server and Mongo DB sofware from the side.  Ensure your path variable contains the execution path of the node.js and mongo binary.

Make sure to start mongodb server before running following commands:

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
