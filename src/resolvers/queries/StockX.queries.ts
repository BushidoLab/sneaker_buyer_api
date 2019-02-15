import { StockXService } from '../../services';

export const StockX = {

    async queryStockXByString(_, { query }) {
        return new StockXService().queryStockXByString(query);
    },

    async queryStockXByStyleAndSize(_, { styleId, size }) {
        return new StockXService().queryStockXByStyleAndSize(styleId, size);
    },

    async queryStockXMarketData(_, { productUUID, productSKU}) {
        return new StockXService().queryStockXMarketData(productUUID, productSKU);
    },
    async queryStockXByStyleAndAllSizes(_, { styleId}) {
        return new StockXService().queryStockXByStyleAndAllSizes(styleId);
    },
    async queryGetAllShoeData(_, { styleId}) {
        return new StockXService().queryGetAllShoeData(styleId);
    },
};
