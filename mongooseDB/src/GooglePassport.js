"use strict";
exports.__esModule = true;
var googleOAuth_1 = require("./googleOAuth");
var passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var GooglePassport = /** @class */ (function () {
    function GooglePassport() {
        this.clientId = googleOAuth_1["default"].id;
        this.secretId = googleOAuth_1["default"].secret;
        passport.use(new GoogleStrategy({
            clientID: this.clientId,
            clientSecret: this.secretId,
            callbackURL: "/api/account/google"
        }, function (accessToken, refreshToken, profile, done) {
            console.log("Google passport strategy");
            process.nextTick(function () {
                console.log('validating google profile:' + JSON.stringify(profile));
                console.log("userId:" + profile.id);
                console.log("displayName: " + profile.displayName);
                console.log("access token: " + accessToken);
                return done(null, profile);
            });
        }));
        passport.serializeUser(function (user, done) {
            console.log("in serialization");
            console.log(user);
            done(null, user);
        });
        passport.deserializeUser(function (user, done) {
            console.log("in deserialization");
            console.log(user);
            done(null, user);
        });
    }
    return GooglePassport;
}());
exports["default"] = GooglePassport;
