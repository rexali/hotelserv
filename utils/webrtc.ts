import WebSocket from "ws";
import { Request, Response, NextFunction } from "express";
// websocket instance 
const websocket = new WebSocket.Server({ port: 3032 });
// clients
const clients: any = {};
 /**
  * Establish WebRTC
  * @param req 
  * @param res 
  * @param next 
  * @param app 
  */
export function establishWebRTCConnection(req: Request, res: Response, next: NextFunction, app?: any) {
    if (req.path === "/webrtc") {
        const wss = websocket.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
            console.log(`webRTC connection established with clientId: ${req.query?.clientId}`);
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
            // Handle errors
            ws.on('error', (error) => {
                console.error('Error occurred:', error);
            });

            // Handle disconnections
            ws.on('close', () => {
                console.log('Client disconnected!');
            });
        })
    } else {
        next()
    }
}