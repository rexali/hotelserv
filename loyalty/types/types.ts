type LoyaltyType = {
    id: number,
    points: number,
    tier: string,
    TransactionId: number,
    UserId: number
    createdAt?: Date,
    updatedAt?: Date
}

export { LoyaltyType }