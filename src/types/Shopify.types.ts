export interface IAddProduct {
  title: string;
  vendor: string;
  productType: string;
  variants?: [IAddVariant];
}

export interface IAddVariant {
  option1: string;
  price: string;
  sku: string;
}

export interface IInventoryItem {
  id: number;
  sku?: string;
  created_at?: string;
  updated_at?: string;
  cost?: string;
  tracked?: boolean;
}
