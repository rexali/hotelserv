import passport, { unuse } from "passport";
import LocalStrategy from "passport-local";
import FacebookStrategy from "passport-facebook";
import TwitterStrategy from 'passport-twitter';
import LinkedInStrategy from 'passport-linkedin-oauth2';
import GoogleStrategy from "passport-google-oauth20";
import dotenv from "dotenv";
import User from "../auth/models/user.model";
import Federation from "../auth/models/federation.model";
import AppleStrategy  from 'passport-apple';
import path from "path";
import { authenticateUserHelper } from "../auth/helpers/authenticateUserHelper";
// var AppleStrategy2  = require("passport-appleid");
dotenv.config();


// use local strategy
passport.use(new LocalStrategy.Strategy(authenticateUserHelper));
// use facebook strategy
passport.use(new FacebookStrategy.Strategy(
    {
        clientID: process.env['FACEBOOK_APP_ID'] as string,
        clientSecret: process.env['FACEBOOK_APP_SECRET'] as string,
        callbackURL: 'https://google.com/auth/oauth2/redirect/facebook',

    },
    function (
        accessToken,
        refreshToken,
        profile,
        cb
    ) {
        Federation.findOne({ where: { provider: "https://www.facebook.com", subject: profile.id } })
            .then((cred) => {
                if (!cred) {
                    // The Facebook account has not logged in to this app before.  Create a
                    // new user record and link it to the Facebook account.
                    User.create({
                        username: profile.displayName,
                        password: "",
                        permission: [],
                        status: "",
                        role: "",
                        code: "",
                    }).then((user) => {
                        Federation.create({ id: user.id, provider: "https://www.facebook.com", subject: profile.id }).then((res: any) => {
                            var newUser = {
                                id: user.id.toString(), // lastId from User
                                username: profile.displayName
                            };
                            
                            return cb(null, newUser);
                        }).catch(err => {
                            if (err) {
                            
                                return cb(err);
                            }
                        });
                    }).catch(err => {
                        if (err) {

                            return cb(err);
                        }
                    })
                } else {
                    // The Facebook account has previously logged in to the app.  Get the
                    // user record linked to the Facebook account and log the user in.
                    User.findOne({ where: { id: cred.id } }).then((user) => {
                        if (!user) {

                            return cb(null, false);
                        }

                        return cb(null, user);
                    }).catch(err => {
                        if (err) {

                            return cb(err);
                        }
                    })
                }
            }).catch(err => {
                if (err) {
                    if (err) {

                        return cb(err);
                    }
                }
            });
    }));

// Use Google startegy
passport.use(new GoogleStrategy.Strategy({
    clientID: process.env['GOOGLE_CLIENT_ID'] as string,
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'] as string,
    callbackURL: 'https://localhost:3030/auth/oauth2/redirect/google'
},
    function (
        accessToken, 
        refreshToken, 
        profile, 
        cb
    ) {
        Federation.findOne({ where: { provider: "https://www.google.com", subject: profile.id } })
            .then((cred) => {
                if (!cred) {
                    // The Google account has not logged in to this app before.  Create a
                    // new user record and link it to the Google account.
                    User.create({
                        username: profile.displayName,
                        password: "",
                        permission: [],
                        status: "",
                        role: "",
                        code: "",
                    }).then((user: any) => {
                        Federation.create({ id: user.id, provider: "https://www.google.com", subject: profile.id }).then((res: any) => {
                            var newUser = {
                                id: user.id.toString(), // lastId from User
                                username: profile.displayName
                            };

                            return cb(null, newUser);
                            // federated credentials
                        }).catch(err => {
                            if (err) { 

                                return cb(err);
                             }
                        });
                        // user
                    }).catch(err => {
                        if (err) { 

                            return cb(err); 
                        }
                    })
                } else {
                    // The Google account has previously logged in to the app.  Get the
                    // user record linked to the Google account and log the user in.
                    User.findOne({ where: { id: cred.id } }).then((user) => {
                        if (!user) { 
                            return cb(null, false); 
                        }

                        return cb(null, user);
                    }).catch(err => {
                        if (err) { 

                            return cb(err); 
                        }
                    })
                }
            }).catch(err => {
                if (err) {
                    if (err) {

                        return cb(err); 
                    }
                }
            })
    }));

// use passport twitter strategy
passport.use(new TwitterStrategy.Strategy({
    consumerKey: process.env['TWITTER_API_KEY'] as string,
    consumerSecret: process.env['TWITTER_API_SECRET'] as string,
    callbackURL: 'http://localhost:3030/auth/oauth2/redirect/twitter'
},
    function (
        token, 
        tokenSecret, 
        profile, 
        cb
    ) {

        Federation.findOne({ where: { provider: "https://www.twitter.com", subject: profile.id } })
            .then((cred) => {
                if (!cred) {
                    // The Twitter account has not logged in to this app before.  Create
                    // new user record and link it to the Twitter account.
                    User.create({
                        username: profile.displayName,
                        password: "",
                        permission: [],
                        status: "",
                        role: "",
                        code: "",
                    }).then((user) => {
                        Federation.create({ id: user.id, provider: "https://www.twitter.com", subject: profile.id }).then((res: any) => {
                            var newUser = {
                                id: user.id.toString(), // lastId from User
                                username: profile.displayName
                            };

                            return cb(null, newUser);
                        }).catch(err => {
                            if (err) {

                                 return cb(err);
                                 }
                        });
                    }).catch(err => {
                        if (err) { 

                            return cb(err); 
                        }
                    })
                } else {
                    // The Twitter account has previously logged in to the app.  Get the
                    // user record linked to the Twitter account and log the user in.
                    User.findOne({ where: { id: cred.id } }).then((user) => {
                        if (!user) { return cb(null, false); }
                        return cb(null, user);
                    }).catch(err => {
                        if (err) {

                             return cb(err);
                             }
                    })
                }
            }).catch(err => {
                if (err) {
                    if (err) {

                        return cb(err); 
                    }
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
}, function (
    accessToken, 
    refreshToken, 
    profile, 
    cb
) {
    Federation.findOne({ where: { provider: "https://www.linkedin.com", subject: profile.id } })
        .then((cred) => {
            if (!cred) {
                // The Linkedin account has not logged in to this app before.  Create
                // new user record and link it to the Twitter account.
                User.create({
                    username: profile.displayName,
                    password: "",
                    permission: [],
                    status: "",
                    role: "",
                    code: "",
                }).then((user) => {
                    Federation.create({ id: user.id, provider: "https://www.linkedin.com", subject: profile.id }).then((res: any) => {
                        var newUser = {
                            id: user.id.toString(), // lastId from User
                            username: profile.displayName
                        };

                        return cb(null, newUser);
                    }).catch(err => {
                        if (err) { 
                            
                            return cb(err);
                         }
                    });
                }).catch(err => {
                    if (err) { 
                        
                        return cb(err); 
                    }
                })
            } else {
                // The Linkedin account has previously logged in to the app.  Get the
                // user record linked to the Twitter account and log the user in.
                User.findOne({ where: { id: cred.id } }).then((user) => {
                    if (!user) { 
                        
                        return cb(null, false);
                     }

                    return cb(null, user);
                }).catch(err => {
                    if (err) { 
                        
                        return cb(err); 
                    }
                })
            }
        }).catch(err => {
            if (err) {
                if (err) { 
                    
                    return cb(err); 
                }
            }
        });
}));

// Use Apple strategy 
passport.use(new AppleStrategy.Strategy({
    clientID: process.env.APPLE_SERVICE_ID as string,
    callbackURL: 'https://www.example.net/auth/apple/callback',
    teamID: process.env.APPLE_TEAM_ID as string,
    keyID: 'RB1233456',
    privateKeyLocation: path.join(__dirname, "./AuthKey_RB1233456.p8"),
}, function(req, accessToken, refreshToken, idToken, profile, cb) {
    // The idToken returned is encoded. You can use the jsonwebtoken library via jwt.decode(idToken)
    // to access the properties of the decoded idToken properties which contains the user's
    // identity information.
    // Here, check if the idToken.sub exists in your database!
    // idToken should contains email too if user authorized it but will not contain the name
    // `profile` parameter is REQUIRED for the sake of passport implementation
    // it should be profile in the future but apple hasn't implemented passing data
    // in access token yet https://developer.apple.com/documentation/sign_in_with_apple/tokenresponse
    // cb(null, idToken as {});
    Federation.findOne({ where: { provider: "https://www.apple.com", subject: profile.id } })
        .then((cred) => {
            if (!cred) {
                // The Apple account has not logged in to this app before.  Create
                // new user record and link it to the Twitter account.
                User.create({
                    username: profile.name,
                    password: "",
                    permission: [],
                    status: "",
                    role: "",
                    code: "",
                }).then((user) => {
                    Federation.create({ id: user.id, provider: "https://www.apple.com", subject: profile.id }).then((res: any) => {
                        var newUser = {
                            id: user.id.toString(), // lastId from User
                            username: profile.displayName
                        };

                        return cb(null, newUser);
                    }).catch(err => {
                        if (err) { 
                            
                            return cb(err);
                         }
                    });
                }).catch(err => {
                    if (err) { 
                        
                        return cb(err); 
                    }
                })
            } else {
                // The Linkedin account has previously logged in to the app.  Get the
                // user record linked to the Twitter account and log the user in.
                User.findOne({ where: { id: cred.id } }).then((user) => {
                    if (!user) { 
                        
                        return cb(null,false as unknown as {}); // check
                     }

                    return cb(null, user);
                }).catch(err => {
                    if (err) { 
                        
                        return cb(err); 
                    }
                })
            }
        }).catch(err => {
            if (err) {
                if (err) { 
                    
                    return cb(err); 
                }
            }
        });
}));

// alternatively
// passport.use(new AppleStrategy2.Strategy({
//     clientID: process.env.APPLE_SERVICE_ID,
//     callbackURL: 'https://www.example.net/auth/apple/callback',
//     teamId: process.env.APPLE_TEAM_ID,
//     keyIdentifier: 'RB1233456',
//     privateKeyPath: path.join(__dirname, "./AuthKey_RB1233456.p8")
//   }, 
//   function(accessToken: any, refreshToken: any, profile: { id: any; }, done: (arg0: any, arg1: any) => void) {
//     const id = profile.id;
//     User.findOrCreate({where:{}}, function (err: any, user: any) {
//         done(err, user);
//     });
//   }
// ));

// serialialise
passport.serializeUser(function (user, done) {
    done(null, user)
})
// deserialise
passport.deserializeUser(function (id, done) {
    User.findByPk(id as number).then((user) => {
        done(null, user)
    }).catch(err => {
        done(err, null)
    })
})

export default passport;