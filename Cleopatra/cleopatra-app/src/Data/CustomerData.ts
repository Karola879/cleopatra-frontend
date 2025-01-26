import { Customer } from "../Models/Customer";

export const CustomerData: Customer[] = [
    {
        CustomerId: 1,
        IdentityUserId: "aaaa-aaaa",
        Name: 'Ala',
        Email: 'ala@test.com',
        PhoneNumber: '123456789',
        DateOfBirth: new Date('2000-06-02'),
        CreatedDate: new Date('2003-01-02')
    },
    {
        CustomerId: 2,
        IdentityUserId: "aaaa-aaax",
        Name: 'Jola',
        Email: 'jola@test.com',
        PhoneNumber: '123456789',
        DateOfBirth: new Date('2000-01-15'),
        CreatedDate: new Date('2003-01-02')
    },
    {
        CustomerId: 3,
        IdentityUserId: "aaaa-aaak",
        Name: 'Magda',
        Email: 'amagda@test.com',
        PhoneNumber: '123456789',
        DateOfBirth: new Date('2001-01-02'),
        CreatedDate: new Date('2003-01-02')
    },
]