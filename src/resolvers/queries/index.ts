import { Item } from './Item.queries';
import { StockX } from './StockX.queries';

export const Queries = {
  ...Item,
  ...StockX
};
