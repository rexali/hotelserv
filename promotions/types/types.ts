export interface PromotionType {
    id?: number;
    RoomId: number;
    UserId: number;
    name: string;
    endDate: string;
    startDate: string;
    description: string;
    minPurchase: string;
    maxPurchase: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}