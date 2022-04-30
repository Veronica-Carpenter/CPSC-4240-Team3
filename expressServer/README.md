This directory contains one express servers:

App.ts - express web server with parameter support
Make sure you install the node.js server software. Ensure your path variable contains the execution path of the node.js binary.

To execute the server run the following commands:

install prerequisites: npm install

compile AppServer.ts: tsc ./src/App.ts

execute AppServer: node ./src/App.js

To test static server routes, try the following URL on the browser while the server is running:
http://localhost:8080/page2.html

To test dynamic server routes, try the following URL on the browser while the server is running:
http://localhost:8080

To test other server routes with simple text messages, JSON objects, try the following URL on the browser while the server is running:
http://localhost:8080/page2
http://localhost:8080/page3

To stop the node.js application, run control + C command.