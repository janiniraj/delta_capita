// Offer types and structure
export type OfferType = "2FOR1" | "3FOR2";

export interface Offer {
    productName: string;
    type: OfferType;
    description: string;
}
