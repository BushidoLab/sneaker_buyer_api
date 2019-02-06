import { ItemController } from '../../controllers';

export const Item = {
    async createItem(_, { product }) {
        return new ItemController().create(product);
    }
}