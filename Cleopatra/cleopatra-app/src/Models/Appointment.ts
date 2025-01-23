export interface Appointment {
    appointmentId: number;
    customerId: number;
    employeeId: number;
    serviceId: number;
    appointmentDateTime: Date;
    duration: number;
    status: string;
    notes: string;
}