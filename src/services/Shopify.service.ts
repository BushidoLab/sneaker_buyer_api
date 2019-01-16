import APIBase from './APIBase';
import { IAddProduct } from '../types/Shopify.types';

export class ShopifyService extends APIBase {
  constructor() {
    super({
      url: process.env.SHOPIFY_ENDPOINT
    });
  }

  public addNewProduct = async (product: IAddProduct): Promise<Error | any> => {
    try {
      return this.axios.post('/admin/products.json', { product });
    } catch (error) {
      throw Error(`There was an error adding a product to Shopify: ${error}`);
    }
  };

  public deleteProduct = async (productId: string): Promise<Error | any> => {
    try {
      return this.axios.delete(`/admin/products/${productId}.json`);
    } catch (error) {
      throw Error(`There was an error deleting an item from Shopify: ${error}`);
    }
  };
}
