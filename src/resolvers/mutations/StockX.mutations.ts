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
  async createSellOrder(_, { qty, expiresAt, productSKU}) {
    return new StockXService().createSellOrder(qty, expiresAt, productSKU);
  },
  async createPortfolioItem(_, { qty, expiresAt, productSKU}) {
    return new StockXService().createPortfolioItem(qty, expiresAt, productSKU);
  },

};
