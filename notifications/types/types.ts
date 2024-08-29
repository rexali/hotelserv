type NotificationType = {
    id: number,
    title: string,
    message: string,
    type: string,
    recipient: string,
    status: string,
    createdAt?: Date,
    updatedAt?: Date
}

export { NotificationType }