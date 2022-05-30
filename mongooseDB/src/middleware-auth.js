"use strict";
exports.__esModule = true;
exports.AuthMiddleWare = void 0;
var AuthMiddleWare = /** @class */ (function () {
    function AuthMiddleWare() {
    }
    // if user is authenticated the redirected to next page else redirect to login page
    AuthMiddleWare.ensureAuth = function (req, res, next) {
        if (req.isAuthenticated()) {
            console.log("yes authenticated");
            next();
        }
        else {
            console.log("not authenticated");
            res.redirect('/');
        }
    };
    AuthMiddleWare.ensureGuest = function (req, res, next) {
        if (!req.isAuthenticated()) {
            console.log("not authenticated");
            next();
        }
        else {
            res.redirect('/');
        }
    };
    return AuthMiddleWare;
}());
exports.AuthMiddleWare = AuthMiddleWare;
