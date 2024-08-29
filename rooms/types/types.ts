export type RoomType = {
    id?: number;
    roomNumber: number;
    roomType: string;
    availability: boolean;
    price: number;
    HotelId: number;
    createdAt?: Date;
    updatedAt?: Date;
}