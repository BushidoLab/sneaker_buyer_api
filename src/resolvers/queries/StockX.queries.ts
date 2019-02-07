import { StockXService } from '../../services';

export const StockX = {

    async getProductMarketData(_, { query }) {
        const response = new StockXService().getProductMarketData(query);
        console.log(response)
        return response;
    },

};

// ```const response = await new StockXService().getCurrentSelling(qty);
// console.log(response)
// return response;```