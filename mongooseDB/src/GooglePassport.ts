import googleOAuth from './googleOAuth';
// let passport = require('passport');
import * as passport from 'passport';

// let GoogleStrategy = require('passport-google-oauth20-with-people-api').Strategy;
let GoogleStrategy = require('passport-google-oauth20').Strategy;

class GooglePassport 
{
    clientId: string;
    secretId: string;
    constructor() 
    {
        this.clientId = googleOAuth.id;
        this.secretId = googleOAuth.secret;
        passport.use(new GoogleStrategy({
                clientID: this.clientId,
                clientSecret: this.secretId,
                callbackURL: "/api/account/google"
            },
            (accessToken, refreshToken, profile, done) => {
                console.log("Google passport strategy");
                process.nextTick(() => {
                    console.log('validating google profile:' + JSON.stringify(profile));
                    console.log("userId:" + profile.id);
                    console.log("displayName: " + profile.displayName);
                    console.log("access token: " + accessToken);
                    return done(null, profile);
                }); 
            }
        ));

        passport.serializeUser(function(user, done) {
            console.log("in serialization")
            console.log(user)
            done(null, user);
        });

        passport.deserializeUser(function(user, done) {
            console.log("in deserialization")
            console.log(user)
            done(null, user);
        });
    }
}
export default GooglePassport;