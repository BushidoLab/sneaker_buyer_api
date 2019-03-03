import { Item } from './Item.queries';
import { StockX } from './StockX.queries';
import { Shopify } from './Shopify.queries';

export const Queries = {
  ...Item,
  ...StockX,
  ...Shopify
};
