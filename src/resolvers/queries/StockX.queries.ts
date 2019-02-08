import { StockXService } from '../../services';

export const StockX = {

    async queryStockXByString(_, { query }) {
        const response = new StockXService().queryStockXByString(query);
        console.log(response)
        return response;
    },

    async queryStockXByStyleAndSize(_, { styleId, size }) {
        new StockXService().queryStockXByStyleAndSize(styleId, size);
    },
};

// ```const response = await new StockXService().getCurrentSelling(qty);
// console.log(response)
// return response;```