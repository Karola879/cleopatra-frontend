import { Employee } from "../Models/Employee";

export const EmployeeData: Employee[] = [
    {
        id: 1,
        name: 'Marta',
        role: 'pracownik',
        email: 'martabeauty@mail.com',
        phoneNumber: '111111111',
        hireDate: new Date('2024-08-03'),
        scheduleId: 1,
    },
    {
        id: 2,
        name: 'Anita',
        role: 'pracownik',
        email: 'anitabeauty@mail.com',
        phoneNumber: '222222222',
        hireDate: new Date('2024-08-03'),
        scheduleId: 2,
    },
    {
        id: 3,
        name: 'Bartosz',
        role: 'pracownik',
        email: 'bartoszbeauty@mail.com',
        phoneNumber: '333333333',
        hireDate: new Date('2024-08-03'),
        scheduleId: 3,
    },
]