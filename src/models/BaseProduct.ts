// Product structure
export class BaseProduct {
    constructor(public name: string, public price: number) {}
}

export interface Product {
    name: string;
    price: number;
}
