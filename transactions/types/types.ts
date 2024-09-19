type TransactionType = {
    id?: number,
    amount: number,
    type: string, // credit, debit, transfer etc
    status: string,
    description: string,
    category: string,  // wallet, room , food
    ref: string,
    LoyaltyId?: number,
    WalletId?: number,
    RoomId?: number,
    promotionId?: number,
    createdAt?: Date,
    updatedAt?: Date,
}

export {
    TransactionType
}