type UserType = {
    id?: number,
    username: string,
    password: string,
    permission: Array<string>,
    status: string,
    role: string,
    code: string,
    createdAt?: Date,
    updatedAt?: Date
}
export {
    UserType
}