This directory contains one express servers:
* index.ts - Encapsulated Node/Express web server w/ Mongo Access

File content:
* src/index.ts - based http server
* src/db/mongoose.ts - mongo db connection
* src/models/user.ts - UserModel definition

Make sure you install the node.js server and Mongo DB sofware from the side.  Ensure your path variable contains the execution path of the node.js and mongo binary.

Make sure to start mongodb server before running following commands:

1. install prerequisites: npm install

2. compile user.ts file
    tsc src/models/user.ts

3. compile mongoose.ts file
    tsc src/db/mongoose.ts

4. compile index.ts file
    tsc src/index.ts

5. Execute Node/Express server on port 8080
    node index.js

To test server, try the following URL on the browser, while the server is running:
* http://localhost:8080/
