import APIBase from './APIBase';

export class StockXService extends APIBase {
  constructor() {
    super({
      url: process.env.STOCKX_ENDPOINT,
      headers: {
        'x-api-key': process.env.STOCKX_API_KEY,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  public login = async (
    email: string,
    password: string
  ): Promise<Error | any> => {
    try {
      return this.axios.post('/stage/v1/login', {
        headers: { email, password }
      });
    } catch (error) {
      throw Error(`There was an error logging into StockX: ${error}`);
    }
  };

  public addPortfolioItem = async (token: string): Promise<Error | any> => {
    try {
      return this.axios.post('/public/v1/portfolio', {
        headers: { 'jwt-authorization': token }
      });
    } catch (error) {
      throw Error(
        `There was an error adding new item to StockX portfolio: ${error}`
      );
    }
  };

  public deletePortfolioItem = async (
    token: string,
    id: string
  ): Promise<Error | any> => {
    try {
      return this.axios.delete('/public/v1/portfolio/', {
        headers: { 'jwt-authorization': token },
        params: { id }
      });
    } catch (error) {
      throw Error(
        `There was an error deleting portfolio item from StockX: ${error}`
      );
    }
  };
}
