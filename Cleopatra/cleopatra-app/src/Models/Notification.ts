export interface Notification {
    notificationId: number;
    customerId: number;
    type: string;
    message: string;
    sentDate: Date;
    status: string;
}