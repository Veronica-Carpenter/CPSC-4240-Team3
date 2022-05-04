import {App} from './App';
import * as express from 'express';

let server: any = new App().expressApp;
server.listen(8080);
console.log("Server is up and running at port 8080")