import { ItemController } from '../../controllers';

export const Item = {
    async createItem(_, { product }, ctx) {
        return new ItemController().create(product);
    }
}