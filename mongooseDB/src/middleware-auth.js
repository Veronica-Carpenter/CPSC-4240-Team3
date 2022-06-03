"use strict";
exports.__esModule = true;
exports.AuthMiddleWare = void 0;
var AuthMiddleWare = /** @class */ (function () {
    function AuthMiddleWare() {
    }
    AuthMiddleWare.ensureAuth = function (req, res, next) {
        if (req.isAuthenticated()) {
            console.log("yes authenticated");
            next();
        }
        else {
            console.log("not authenticated");
            res.json({
                "message": "Not Authorized",
                "statusCode": 403
            });
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
