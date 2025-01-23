import { Customer } from "../Models/Customer";

export const CustomerData: Customer[] = [
    {
        customerId: 1,
        identityUserId: "aaaa-aaaa",
        name: 'Ala',
        email: 'ala@test.com',
        phoneNumber: '123456789',
        dateOfBirth: new Date('2000-06-02'),
        profilePicture: 'aaa',
        createdDate: new Date('2003-01-02')
    },
    {
        customerId: 2,
        identityUserId: "aaaa-aaax",
        name: 'Jola',
        email: 'jola@test.com',
        phoneNumber: '123456789',
        dateOfBirth: new Date('2000-01-15'),
        profilePicture: 'aaa',
        createdDate: new Date('2003-01-02')
    },
    {
        customerId: 3,
        identityUserId: "aaaa-aaak",
        name: 'Magda',
        email: 'amagda@test.com',
        phoneNumber: '123456789',
        dateOfBirth: new Date('2001-01-02'),
        profilePicture: 'aaa',
        createdDate: new Date('2003-01-02')
    },
]