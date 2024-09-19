import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import swaggerUI from "swagger-ui-express";
import swaggerSpec from "./config/swagger.config";
import session from "express-session";
import passport from "./config/passport.config"
import authRouter from "./auth/routes/user.routes";
var swaggerDocument: any = require("./config/swagger.json");
import dotenv from "dotenv";
import { errorHandler } from "./utils/errorHandler";
import { createCsrfProtection } from "./utils/csrfProtection";
import helmet from "helmet";
import expressValidator from "express-validator";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { cacheReqRes, getCachedReqRes } from "./utils/cacheReqRes";
import { eventEmitter } from "./utils/webhook";
var SSE = require('express-sse');
import { establishWebsocketConnection } from "./utils/websocket";
import { establishWebRTCConnection } from "./utils/webrtc";
import { createServer } from 'http';
import { Server } from "socket.io";
var webrtc = require('wrtc');
import bodyParser from "body-parser";

import roomRouter from "./rooms/routes/routes";
import hotelRouter from "./hotels/routes/hotel.routes";
import profileRouter from "./profiles/routes/profile.routes";
import bookingRouter from "./bookings/routes/booking.routes";
import guestRouter from "./guests/routes/guest.routes";
import { getTransactionUrl } from "./payments/paystack/getTransactionURL";
import { getWebhookData } from "./payments/paystack/getWebhookData";
import { verifyTransaction } from "./payments/paystack/verifyTransaction";
import { verifyPay } from "./payments/flutterwave/verifyPay";
import { getWebhook } from "./payments/flutterwave/getWebhook";
import { getPayLink } from "./payments/flutterwave/getPayLink";
import notificationRouter from "./notifications/routes/notification.routes";
import messageRouter from "./messages/routes/message.routes";
import cartRouter from "./carts/routes/cart.routes";
import favoriteRouter from "./favourites/routes/favorite.routes";
import promotionRouter from "./promotions/routes/promotion.routes";
import homeRouter from "./homes/routes/home.routes";
import transactionRouter from "./transactions/routes/tranaction.routes";
import reviewRouter from "./reviews/routes/review.routes";
import { setReminderTask } from "./utils/setReminder";
import {
    // automateJobTask, 
    automateTask
} from "./utils/automateTask";
import { sendNotification } from "./utils/sendNotification";
import walletRouter from "./wallets/routes/wallet.routes";
import { sequelize } from "./config/sequelize.config";
import loyaltyRouter from "./loyalty/routes/loyalty.routes";
dotenv.config();

setReminderTask('2024-08-23 18:37:39', () => {
    console.log('I am working');
});
automateTask('* * * * * *', () => { }); //.job.start()
// instance
var app = express();
const httpServer = createServer(app)
const io = new Server(httpServer, {});

// server-side event instance
var sse = new SSE();
// port
const PORT = 3030;
// Middleware to parse JSON request bodies
app.use(express.json());
// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));
// body parser for Apple
app.use(bodyParser.urlencoded({ extended: true }));
// use cors
app.use(cors());
// use parser
app.use(cookieParser());
// session
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true, cookie: { secure: true } }))
// initialize newpassport
app.use(passport.initialize());
// use newpassport session
app.use(passport.session())
// logger
app.use(logger('dev'));
// prevent hacker from knowing our stack
app.disable("x-powered-by");
// static file
app.use(express.static("public"));
// log error
app.use(errorHandler);
// help set response headers
app.use(helmet())
// help validate and sanitise
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, //15mins
    max: 100 // limit each ip to 100 request per WindowMs i.e 15min
}));
// compress all response
// app.use(compression());
// view engine setup
app.set('view engine', 'ejs');
// set view directory and pages
app.set("views", "views");
// test connection and synchronise to database
((() => {
    sequelize.authenticate().then(() => {
        console.log("connected with database successfully");
    }).catch((error: any) => {
        console.error("Unable to connect with database: " + error);
    });

    sequelize.sync({ force: false }).then(() => {
        console.log("database synced successfully");
    }).catch((error: any) => {
        console.error("Unable to sync with database: " + error);
    })
}))();
// websocket connection route
app.use((req: Request, res: Response, next: NextFunction) => {
    establishWebsocketConnection(req, res, next, app);
});
// webRTC connection route
app.use((req: Request, res: Response, next: NextFunction) => {
    // Create a new WebRTC peer connection using websocket
    establishWebRTCConnection(req, res, next, app)
});

// authentication route
app.use("/auth", authRouter);
// profile route
app.use("/profiles", profileRouter);
// hotel route
app.use("/hotels", hotelRouter)
// room route
app.use("/rooms", roomRouter);
// booking route
app.use("/bookings", bookingRouter);
// guest route
app.use("/guests", guestRouter);
// notification route
app.use("/notifications", notificationRouter);
// message route
app.use("/messages", messageRouter);
// cart route
app.use("/carts", cartRouter);
// favourite route
app.use("/favorites", favoriteRouter);
// promotion route
app.use("/promotions", promotionRouter);
// homes route
app.use("homes", homeRouter);
// transaction route
app.use("/transactions", transactionRouter);
// Review route
app.use("/reviews", reviewRouter);
// wallet route
app.use("/wallets", walletRouter);
// wallet route
app.use("/loyalties", loyaltyRouter);

// csrf protection route
app.get("/csrf", createCsrfProtection);

// server home route 
app.get("/", async (req: Request, res: Response, next: NextFunction) => {
    // trigger event
    eventEmitter.emit("user.created", { "type": "webhook", "content": "Hello", "id": 1 });
    // trigger another event
    eventEmitter.emit("hotel.created", { "type": "webhook", "content": "Hello", "id": 2 });
    // render home page
    res.render("index", {});
});

// Swagger json route
app.use('/docs.json', (req: Request, res: Response, next: NextFunction) => {
    // set header
    res.setHeader('Content-Type', 'application/json');
    // send 
    res.send(swaggerSpec);
});

// Swagger API doc route
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
// server-side event stream route:
app.get('/events', async function (req: Request, res: Response, next: NextFunction) {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    // send a ping approx every 2 seconds
    var timer = setInterval(async function () {
        let user = {
            name: "Aliyu"
        }
        let data = JSON.stringify(user);
        // const date = new Date(Date.now());

        // flush the data to the web
        res.write(`data:${data}\n\n`);
        // res.write(`data:${date}\n\n`);

        // !!! this is the important part
        // flush the data to the web
        res.flush = () => { };
    }, 2000)
    res.on('close', function () {
        clearInterval(timer)
    })
});

// subscription endpoint: subscribe to a stream 
app.get('/stream', function (req: Request, res: Response, next: NextFunction) {
    res.flush = () => { };
    next();
},
    sse.init
);

// publishing endpoint: publish to subscribers by posting to this endpoint
app.post('/stream', function (req: Request, res: Response, next: NextFunction) {
    const content = req.body;
    // update the database and read the update and publish to subscribers
    sse.serialize([content]);
    // sse.updateInit([{...content}]);
});

// webhook endpoint/route to process data
app.post("/webhook", (req: Request, res: Response, next: NextFunction) => {
    // process event
    console.log("Event recieved");
    console.log(req.body)
});

// paystack route
app.post("/paystack_trx_url", getTransactionUrl);
app.post("/paystack_webhook", getWebhookData);
app.post("/paystack_verify", verifyTransaction);

// flutterwave route
app.post("/flw_trx_link", getPayLink);
app.post("/flw_webhook", getWebhook);
app.post("/flw_verify", verifyPay);

// notification route
app.get("/notify", sendNotification);

// Not found route
app.use((req: Request, res: Response, next: NextFunction) => {
    // return failure message
    res.status(404).json({
        status: "fail",
        message: "Page Not Found",
        data: null
    })
});

const clients: any = {};

io.on('connection', (socket) => {

    console.log('Client socket.io connected');
    // clients[socket.request.url?.search as string] = socket;
    console.log(socket.request.url);
    clients[socket.request.url as string] = socket;
    // Handle WebRTC peer connection
    socket.on('webrtc', (data: any) => {
        const toClientId = data.clientId as string
        const client = clients[toClientId];
        // Create a new WebRTC peer connection
        const peerConnection = new webrtc.RTCPeerConnection();
        if (data.type === 'broadcast') {
            // Broadcast message to all clients
            clients.forEach((client: any) => {
                client.emit("client", data);
            });
            // otherwise sent to target client
        } else if (data.type === 'offer') {
            // Set the offer as the remote description
            console.log(data.offer);

            try {
                peerConnection.setRemoteDescription(data.offer);
                // Create an answer and set it as the local description
                peerConnection.createAnswer().then((answer: any) => {
                    peerConnection.setLocalDescription(answer);
                    // Send the answer to the client
                    socket.emit("webrtc", answer);
                });
            } catch (error) {
                console.warn(error);
            }
            // handle answer from a clident
        } else if (data.type === 'answer') {
            // Set the answer as the remote description
            peerConnection.setRemoteDescription(data.answer);
            // Handle ice candidates from clients
        } else if (data.type === 'ice-candidate') {
            // Add the ice candidate to the peer connection
            peerConnection.addIceCandidate(data.candidate);
        } else if (data.type === 'stream') {
            // Broadcast message to all clients
            clients.forEach((client: any) => {
                client.emit("stream", data);
            });
            // hansle send data from client
        } else if (data.type === "sendData") {
            // Broadcast message to all clients
            clients.forEach((client: any) => {
                client.emit("sendData", data);
            });
        } else {
            // send to specific client
            if (client) {
                client.emit("oneClient", data);
                console.log("Message sent");
            }
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
});

httpServer.listen(3033, () => {
    console.log(`Socket Server is listening at port ${3033}`);
})

export default app;

