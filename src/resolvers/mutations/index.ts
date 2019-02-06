import { Item } from './Item.mutations';
import { StockX } from './StockX.mutations';

export const Mutations = {
  ...Item,
  ...StockX
};
