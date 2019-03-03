import { ShopifyService } from '../../services';

export const Shopify = {
    // shopifyGetAllProducts(qty: String): JSON
    async shopifyGetAllProducts(_, { qty }) {
      return new ShopifyService().shopifyGetAllProducts(qty);
    },
  
  };
