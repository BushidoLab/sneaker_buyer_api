import { StockXService } from '../../services';

export const StockX = {

    async queryStockXByString(_, { query }) {
        new StockXService().queryStockXByString(query);
    },

    async queryStockXByStyleAndSize(_, { styleId, size }) {
        return new StockXService().queryStockXByStyleAndSize(styleId, size);
    },

    async queryStockXMarketData(_, { productUUID, productSKU}) {
        new StockXService().queryStockXMarketData(productUUID, productSKU);
    }

};

// ```const response = await new StockXService().getCurrentSelling(qty);
// console.log(response)
// return response;```