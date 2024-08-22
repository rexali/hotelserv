import EventEmitter from "events";

// new instance
const eventEmitter = new EventEmitter();

eventEmitter.on("user.created", userCreatedHandler);

async function userCreatedHandler(args: any){
    try {
        fetch(
            "http://localhost:3030/webhook",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(args)
            }) 
    } catch (error) {
        console.log(error)
    }
}

eventEmitter.on("hotel.created", hotelCreatedHandler);

async function hotelCreatedHandler(args: any){
    try {
        fetch(
            "http://localhost:3030/webhook",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(args)
            }) 
    } catch (error) {
        console.log(error)
    }
}

export {eventEmitter}


