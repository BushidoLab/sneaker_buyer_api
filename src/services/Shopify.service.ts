import APIBase from './APIBase';
import { IAddProduct, IInventoryItem } from '../types/Shopify.types';

export class ShopifyService extends APIBase {
  constructor() {
    super({
      baseURL:
        'https://9fb819644662ea6f72addc2d44125495:0d603852f2db11c8aedf276454691c6a@luxurycrypto.myshopify.com',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public async updateInventoryItem(inventoryItem: IInventoryItem) {
    try {
      return this.axios.put(`/admin/inventory_items/${inventoryItem.id}`, {
        inventory_item: { ...inventoryItem }
      });
    } catch (error) {
      throw Error(`There was an errpr upating inventory item ${error}`);
    }
  }

  public addNewProduct = async (product: IAddProduct): Promise<Error | any> => {
    try {
      const body = {
        product: {
          title: product.title,
          vendor: product.vendor,
          product_type: product.productType,
          body_html: '<strong>test!</strong>'
        }
      };
      return this.axios.post('/admin/products.json', body);
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
