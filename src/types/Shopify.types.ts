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


