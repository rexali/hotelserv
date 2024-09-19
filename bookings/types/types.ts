type BookingType = {
    id?: number,
    startDate: Date,
    endDate: Date,
    status: string,
    RoomId: number,
    UserId:number,
    createdAt?: Date,
    updatedAt?: Date
}
export default BookingType;