import WebSocket from "ws";
import { Request, Response, NextFunction } from "express";

// websocket instance
const websocket = new WebSocket.Server({ port: 3031 });
// clients
const clients:any = {}; 

export function establishWebsocketConnection (req:Request, res:Response, next:NextFunction, app?:any) {
    if (req.path === "/websocket") {
        const wss = websocket.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
            // websocket connection established
            console.log(`websocket connection established with clientId: ${req.query?.clientId}`);
            app.locals.ws = ws;
            clients[req.query?.clientId as string] = ws;
            ws.onmessage = (event: any) => {
                const toClientId = JSON.parse(event.data).clientId as string
                const client = clients[toClientId];
                // const client = clients[req.query.clientId as string];
                if (client) {
                    client.send(event.data);
                    console.log("Message sent");
                }
            };
            ws.on('error', (err) => {
                console.log(err)
            })

            ws.on('close', () => {
                console.log(`Connection closed`);
            })
        })
    } else {
        next()
    }
}