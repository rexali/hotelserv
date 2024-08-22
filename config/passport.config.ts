import passport from "passport";
import { User } from "../auth/models/user.model";
import { checkPassword } from "../auth/utils/hashCheckPassword";
import LocalStrategy from "passport-local";
import FacebookStrategy from "passport-facebook";
import TwitterStrategy from 'passport-twitter';
import LinkedInStrategy from 'passport-linkedin-oauth2';
import GoogleStrategy from "passport-google-oauth20";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { loginToVerifyUser } from "../auth/controllers/user.controller";
import { Federation } from "../auth/models/federation.model";
dotenv.config();

/**
 * Verify user credentials
 * @param username email of the user
 * @param password password of the user
 * @param done a callback
 */
async function verifyUser(username: string, password: string, done: Function) {
    User.findOne({ where: { username: username } }).then((user: any) => {
        if (!user) return done(null, false, { message: "Incorrect Username or password" });
        if (!checkPassword(password, user.password)) return done(null, false, { message: "Incorrect Username or password" });
        const token = jwt.sign({ userId: user.id, role: user.role, permission: user.permission }, process.env["SECRET_KEY"] as string, { expiresIn: '1h' });
        const userPlusToken = { username, status: user.status, code: user.code, token }
        return done(null, userPlusToken);
    }).catch(err => {
        if (err) return done(err);
    })
}

// use local strategy
passport.use(new LocalStrategy.Strategy(loginToVerifyUser));
// use facebook strategy
passport.use(new FacebookStrategy.Strategy(
    {
        clientID: process.env['FACEBOOK_APP_ID'] as string,
        clientSecret: process.env['FACEBOOK_APP_SECRET'] as string,
        callbackURL: 'https://google.com/auth/oauth2/redirect/facebook',

    },
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
        Federation.findOne({ where: { provider: "https://www.facebook.com", subject: profile.id } })
            .then((cred: any) => {
                if (!cred) {
                    // The Facebook account has not logged in to this app before.  Create a
                    // new user record and link it to the Facebook account.
                    User.create({ username: profile.displayName }).then((user: any) => {
                        Federation.create({ id: user.id, provider: "https://www.facebook.com", subject: profile.id }).then((res: any) => {
                            var newUser = {
                                id: user.id.toString(), // lastId from User
                                username: profile.displayName
                            };
                            return cb(null, newUser);
                        }).catch(err => {
                            if (err) { return cb(err); }
                        });
                    }).catch(err => {
                        if (err) { return cb(err); }
                    })
                } else {
                    // The Facebook account has previously logged in to the app.  Get the
                    // user record linked to the Facebook account and log the user in.
                    User.findOne({ where: { id: cred.id } }).then((user) => {
                        if (!user) { return cb(null, false); }
                        return cb(null, user);
                    }).catch(err => {
                        if (err) { return cb(err); }
                    })
                }
            }).catch(err => {
                if (err) {
                    if (err) { return cb(err); }
                }
            });
    }));

// Use Google startegy
passport.use(new GoogleStrategy.Strategy({
    clientID: process.env['GOOGLE_CLIENT_ID'] as string,
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'] as string,
    callbackURL: 'https://localhost:3030/auth/oauth2/redirect/google'
},
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
        Federation.findOne({ where: { provider: "https://www.google.com", subject: profile.id } })
            .then((cred: any) => {
                if (!cred) {
                    // The Google account has not logged in to this app before.  Create a
                    // new user record and link it to the Google account.
                    User.create({ username: profile.displayName }).then((user: any) => {
                        Federation.create({ id: user.id, provider: "https://www.google.com", subject: profile.id }).then((res: any) => {
                            var newUser = {
                                id: user.id.toString(), // lastId from User
                                username: profile.displayName
                            };
                            return cb(null, newUser);
                            // federated credentials
                        }).catch(err => {
                            if (err) { return cb(err); }
                        });
                        // user
                    }).catch(err => {
                        if (err) { return cb(err); }
                    })
                } else {
                    // The Google account has previously logged in to the app.  Get the
                    // user record linked to the Google account and log the user in.
                    User.findOne({ where: { id: cred[0].id } }).then((user) => {
                        if (!user) { return cb(null, false); }
                        return cb(null, user);
                    }).catch(err => {
                        if (err) { return cb(err); }
                    })
                }
            }).catch(err => {
                if (err) {
                    if (err) { return cb(err); }
                }
            })
    }));



    // use passport twitter strategy
    passport.use(new TwitterStrategy.Strategy({
        consumerKey: process.env['TWITTER_API_KEY'] as string,
        consumerSecret: process.env['TWITTER_API_SECRET'] as string,
        callbackURL: 'http://localhost:3030/auth/oauth2/redirect/twitter'
    },
        function (token: any, tokenSecret: any, profile: any, cb: any) {

            Federation.findOne({ where: { provider: "https://www.twitter.com", subject: profile.id } })
                .then((cred: any) => {
                    if (!cred) {
                        // The Twitter account has not logged in to this app before.  Create
                        // new user record and link it to the Twitter account.
                        User.create({ username: profile.displayName }).then((user: any) => {
                            Federation.create({ id: user.id, provider: "https://www.twitter.com", subject: profile.id }).then((res: any) => {
                                var newUser = {
                                    id: user.id.toString(), // lastId from User
                                    username: profile.displayName
                                };
                                return cb(null, newUser);
                            }).catch(err => {
                                if (err) { return cb(err); }
                            });
                        }).catch(err => {
                            if (err) { return cb(err); }
                        })
                    } else {
                        // The Twitter account has previously logged in to the app.  Get the
                        // user record linked to the Twitter account and log the user in.
                        User.findOne({ where: { id: cred.id } }).then((user) => {
                            if (!user) { return cb(null, false); }
                            return cb(null, user);
                        }).catch(err => {
                            if (err) { return cb(err); }
                        })
                    }
                }).catch(err => {
                    if (err) {
                        if (err) { return cb(err); }
                    }
                });
        }
    ));
// Use linkedin strategy
passport.use(new LinkedInStrategy.Strategy({
    clientID: process.env["LINKEDIN_KEY"] as string,
    clientSecret: process.env["LINKEDIN_SECRET"] as string,
    callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile'],
}, function (accessToken: any, refreshToken: any, profile: any, cb: any) {
    Federation.findOne({ where: { provider: "https://www.linkedin.com", subject: profile.id } })
        .then((cred: any) => {
            if (!cred) {
                // The Linkedin account has not logged in to this app before.  Create
                // new user record and link it to the Twitter account.
                User.create({ username: profile.displayName }).then((user: any) => {
                    Federation.create({ id: user.id, provider: "https://www.linkedin.com", subject: profile.id }).then((res: any) => {
                        var newUser = {
                            id: user.id.toString(), // lastId from User
                            username: profile.displayName
                        };
                        return cb(null, newUser);
                    }).catch(err => {
                        if (err) { return cb(err); }
                    });
                }).catch(err => {
                    if (err) { return cb(err); }
                })
            } else {
                // The Linkedin account has previously logged in to the app.  Get the
                // user record linked to the Twitter account and log the user in.
                User.findOne({ where: { id: cred.id } }).then((user) => {
                    if (!user) { return cb(null, false); }
                    return cb(null, user);
                }).catch(err => {
                    if (err) { return cb(err); }
                })
            }
        }).catch(err => {
            if (err) {
                if (err) { return cb(err); }
            }
        });
}));


// serialialise
passport.serializeUser(function (user, done) {
    done(null, user)
})
// deserialise
passport.deserializeUser(async function (user: any, done) {
    done(null, user)
})

export default passport;