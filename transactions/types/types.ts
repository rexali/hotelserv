type TransactionType = {
    id?: number,
    amount: number,
    type: string, // credit, debit, transfer etc
    status: string,
    description: string,
    categoryId: string
}

export {
    TransactionType
}