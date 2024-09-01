type ProfileType = {
    id?: number;
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    image: string;
    phone: string;
    address: string;
    localGovt: string;
    state: string;
    country: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export { ProfileType };