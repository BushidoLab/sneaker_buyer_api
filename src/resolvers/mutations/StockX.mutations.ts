import { StockXService } from '../../services';

export const StockX = {
  async loginToStockX(_, { email, password }) {
    return new StockXService().login(email, password);
  },
  async addPortfolioItem(_, { token }) {
    return new StockXService().addPortfolioItem(token);
  },
  async deletePortfolioItem(_, { token, id }) {
    return new StockXService().deletePortfolioItem(token, id);
  },
  // async ask(_, { token }) {
  //   return new StockXService().ask(token);
  // }
};
