export interface Appointment {
    AppointmentId: number;
    CustomerId: number;
    EmployeeId: number;
    ServiceId: number;
    AppointmentDateTime: Date;
    Status: string;
    Notes: string;
}