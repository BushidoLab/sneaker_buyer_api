import { StockXService } from '../../services';

export const StoxkX = {
  async loginToStockX(_, { email, password }) {
    return new StockXService().login(email, password);
  },
  async addPortfolioItem(_, { token }) {
    return new StockXService().addPortfolioItem(token);
  },
  async deletePortfolioItem(_, { token, id }) {
    return new StoxkXService().deletePortfolioItem(token, id);
  },
  async ask(_, { token }) {
    return new StockXService().ask(token);
  }
};
