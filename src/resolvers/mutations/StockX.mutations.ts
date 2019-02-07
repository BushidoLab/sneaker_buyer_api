import { StockXService } from '../../services';

export const StockX = {
  // Log-in to StockX with email and password input variables
  // Returns JWT-AUTH token
  async loginToStockX(_, { email, password }) {
    return new StockXService().login(email, password);
  },
  // INCOMPLETE
  async addPortfolioItem(_, { token }) {
    return new StockXService().addPortfolioItem(token);
  },
  // INCOMPLETE
  async deletePortfolioItem(_, { token, id }) {
    return new StockXService().deletePortfolioItem(token, id);
  },
  // Log-in to StockX with .ENV variables
  // TEMPORARY FUNCTION
  // Returns JWT-AUTH token
  async loginToStockXWithEnv(_, { email }) {
    return new StockXService().loginWithEnv(email);
  },
  // Retrieve inventory of products for sale.
  async getCurrentSelling(_, { qty }) {
    return new StockXService().getCurrentSelling(qty);
  },
  // Retrieve inventory of products for sale.
  async getProductMarketData(_, { name }) {
    return new StockXService().getProductMarketData(name);
  },  
  // async ask(_, { token }) {
  //   return new StockXService().ask(token);
  // }
};
