import passport from "passport";
import { verifyPassword } from "./verifyPassword";
var LocalStrategy = require("passport-local");

let db: { user: any; };
passport.use(new LocalStrategy(function (username: string, password: string, done: Function) {
    db.user.findOne({ username }, function (err: any, user: any) {
        if (err) {
            return done(err)
        }
        if (!user) {
            return done(null, false)
        }
        if (!verifyPassword(password)) {
            return done(null, false)
        }
        return done(null, user)
    })
}));

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (id, done) {
    db.user.findById(id, (err: any, user: any) => {
        done(err, user);
    })
})

export{
    passport
}