export interface IAddProduct {
  title: string;
  vendor: string;
  productType: string;
  variants?: [IVariant];
}

interface IVariant {
  option1: string;
  price: string;
  sku: string;
}
