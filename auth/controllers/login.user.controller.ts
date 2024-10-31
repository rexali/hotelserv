import passport from "passport";
import { verifyPassword } from "../utils/verifyPassword";
import LocalStrategy from "passport-local";
import { getUser } from "./user.controller";


function authUser(username: string, password: string, done: Function) {
    
    const user = getUser(username);
    if (user === null) {
        done(null, false);
    }
    if (!verifyPassword(password)) {
        done(null, false);
    }
    return done(null, user)
}

passport.use(new LocalStrategy.Strategy(authUser));

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(async function (user: any, done) {
    done(null, user)
})

export {
    passport
}