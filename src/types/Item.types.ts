import { IAddProduct, IAddVariant } from ".";

export interface IItem {
    productType: string;
    title: string;
    vendor: string;
    variants?: [IAddVariant];
    purchasePrice: string;
    shopifyProductId?: string;
    shopifyListPrice?: number;
    stockXProductId?: string;
    stockXListPrice?: number;
}

export interface ICreateItem {
    shopify: IAddProduct

}