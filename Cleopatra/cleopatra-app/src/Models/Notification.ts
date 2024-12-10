export interface Notification {
    notificationId: string;
    customerId: string;
    type: string;
    message: string;
    sentDate: Date;
    status: string;
}