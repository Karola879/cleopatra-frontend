export interface Schedule {
    id: number;
    employeeId: number;
    startDateTime: Date;
    endDateTime: Date;
    breakTimes: number;
}