"use strict";
exports.__esModule = true;
var dotenv = require('dotenv');
dotenv.config();
var googleOAuth = /** @class */ (function () {
    function googleOAuth() {
    }
    googleOAuth.id = process.env.googleId;
    googleOAuth.secret = process.env.googleSecret;
    return googleOAuth;
}());
exports["default"] = googleOAuth;
