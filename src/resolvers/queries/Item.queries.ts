import { ItemController } from '../../controllers';

export const Item = {
    async getItems(_, args, ctx) {
        return new ItemController().get();
    }
}