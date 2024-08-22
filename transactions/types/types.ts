type TransactionType = {
    id?: number,
    amount: number,
    type: string, // credit, debit etc
    status: string,
    description: string,
    categoryId: string
}

export {
    TransactionType
}