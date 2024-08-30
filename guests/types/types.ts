type GuestType = {
    id: number,
    preferences: string[],
    RoomId:number,
    BookingId:number,
    createdAt?:Date,
    updatedAt?:Date
}

export {GuestType}