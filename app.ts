import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./config/swagger.config";
import { sequelize } from "./config/sequelize.config";
import { passport } from "./auth/loginUser";
import session from "express-session";
var swaggerDocument:any = require("./config/swagger.json")

// instance
var app = express();
// port
const PORT = 3030;
// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));
// use cors
app.use(cors());
// use parser
app.use(cookieParser());
// session
app.use(session({ secret: 'aly', resave: true, saveUninitialized: true }))
// initialize passport
app.use(passport.initialize());
// use passport session
app.use(passport.session())
// logger
app.use(logger('dev'));
// prevent hacker from knowing our stack
app.disable("x-powered-by");
// static file
app.use(express.static("public"));
// view engine setup
app.set('view engine', 'ejs');
app.set("views", "views");
// test connection to database
((async () => {
    try {
        await sequelize.authenticate()
    } catch (error) {
        console.error("Unable to connect to database: " + error);
    }
}))();

// server home route 
app.get("/", async (req: Request, res: Response, next: NextFunction) => {
    // render home page
    res.render("home", {});
});

// local login method
app.post('/login',
    passport.authenticate(
        'local',
        {
            failureRedirect: '/login',
            successReturnToOrRedirect: '/',
            failureMessage: true
        }
    ));

// SWAGGER
app.use('/docs.json', (req: Request, res: Response, next: NextFunction) => {
    // set header
    res.setHeader('Content-Type', 'application/json');
    // send 
    res.send(swaggerSpec);
});

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use((req: Request, res: Response, next: NextFunction) => {
    // return failure message
    res.status(404).json({
        status: "fail",
        message: "Page not found", 
        data: {}
    })
});

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
})


