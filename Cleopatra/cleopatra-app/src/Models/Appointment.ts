export interface Appointment {
    id: string;
    customerId: string;
    employeeId: string;
    serviceId: string;
    appointmentDateTime: string;
    durations: number;
    status: string;
    notes: string;
}