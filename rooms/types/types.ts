export type RoomType = {
    id?: number;
    photos: string[];
    roomNumber: number;
    roomType: string;
    availability: boolean;
    price: number;
    HotelId: number;
    createdAt?: Date;
    updatedAt?: Date;
}