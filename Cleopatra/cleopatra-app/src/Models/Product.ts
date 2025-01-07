export interface Product {
    id: number;
    name: string;
    brand: string;
    quantityInStock: number;
    pricePerUnit: number;
    lastRestockedDate: Date
}