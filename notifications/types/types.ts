type NotificationType = {
    id?: number,
    title: string,
    message: string,
    type: string,
    triggers: [string],
    channels: [string],
    recipients: [string],
    timing: [string],
    actions: [string],
    status:string
}

export { NotificationType }