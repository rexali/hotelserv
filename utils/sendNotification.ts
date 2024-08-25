import { Request, Response } from "express";
import notifier from "node-notifier";

export function sendNotification(req: Request, res: Response) {
    try {
        const data = req.body;
        notifier.notify(
            {
                title: "Hello from Express", // data.title
                message: "This notification from your express appl", // data.message
                icon: "public/uploads/image-1723914058837-400124143.jpg", //data.icon
                sound: true,
                wait: true
            },
            function (err, response, metadata) {
                if (err) {
                    res.status(400).json({status:'failed', data:null, message:"Error: "+err})  
                }else{
                    res.status(200).json({status:'success', data:null, message:"Notification sent"})
                }
            }
        );
    
        notifier.on('click', (notifierObject, options,event) => {
            console.log('you click me');
        });
    
        notifier.on('timeout', (notifierObject, options) => {
            console.log('Notification closed');
        })
     
    } catch (error) {
        res.status(500).json({status:'success', data:null, message:"Error: "+error}) 
    }
   
}