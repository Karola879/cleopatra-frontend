export interface Product {
    id: string;
    name: string;
    brand: string;
    quantityInStock: number;
    pricePerUnit: number;
    lastRestockedDate: Date
}