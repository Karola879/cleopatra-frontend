export interface Appointment {
    id: number;
    customerId: number;
    employeeId: number;
    serviceId: string;
    appointmentDateTime: Date;
    durations: number;
    status: string;
    notes: string;
}