type MessageType = {
    id?: number,
    title: string,
    message: string,
    recipient: string,
    sender:string,
    UserId:number,
    createdAt?: Date,
    updatedAt?: Date

}

export { MessageType }