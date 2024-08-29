type ReviewType = {
    id?: number,
    title: string,
    content: string,
    rating: number,
    status: string,
    RoomId: number,
    UserId: number,
    createdAt?: Date,
    updatedAt?: Date

}

export { ReviewType }