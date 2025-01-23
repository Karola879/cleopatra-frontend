import { Appointment } from "../Models/Appointment";

export const AppointmentData: Appointment[] = [
    {
        appointmentId: 1,
        customerId: 1,
        employeeId: 1,
        serviceId: 1,
        appointmentDateTime: new Date('2025-01-21T15:00:00'),
        duration: 50,
        status: 'pending',
        notes: 'first'
    },
    {
        appointmentId: 2,
        customerId: 2,
        employeeId: 1,
        serviceId: 2,
        appointmentDateTime: new Date('2025-01-21T11:00:00'),
        duration: 50,
        status: 'pending',
        notes: 'second'
    },
    {
        appointmentId: 3,
        customerId: 3,
        employeeId: 1,
        serviceId: 3,
        appointmentDateTime: new Date('2025-01-22T10:00:00'),
        duration: 50,
        status: 'confirmed',
        notes: 'first'
    },
]