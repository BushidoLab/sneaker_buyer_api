import APIBase from './APIBase';
// import { * } from 'superagent';
const superagent = require('superagent')

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

  public login = async (email: string, password: string): Promise<Error | any> => {
    let loginResponse;
    try {
      // return this.axios.post('/stage/v1/login', { email, password });
      superagent
      .post(process.env.STOCKX_ENDPOINT + 'login')
      .send({ email: email, password: password })
      .set('x-api-key', process.env.STOCKX_API_KEY)
      .end((err, res) => {
        if (err) {
          return err
        } else {
          loginResponse = res.header['jwt-authorization'];
          return loginResponse;
        }
      })
    }
    catch (error) {
      throw Error(`There was an error logging into StockX: ${error}`);
    }
  };

  public addPortfolioItem = async (token: string): Promise<Error | any> => {
    let apiToken = await this.loginWithEnv(process.env.STOCKX_EMAIL).toString();
    try {
      return this.axios.post(process.env.STOCKX_ENDPOINT + 'portfolio', {
        headers: { 'jwt-authorization': apiToken}
      });
    } catch (error) {
      throw Error(`There was an error adding new item to StockX portfolio: ${error}`);
    }
  };

  public deletePortfolioItem = async (token: string, id: string): Promise<Error | any> => {
    try {
      return this.axios.delete('/public/v1/portfolio/', {
        headers: { 'jwt-authorization': token },
        params: { id }
      });
    } catch (error) {
      throw Error(`There was an error deleting portfolio item from StockX: ${error}`);
    }
  };

  public getCurrentSelling = async (qty: string): Promise<Error | any> => {
    let inventory;
    try {
      return superagent
        .get('https://gateway.stockx.com/public/v1/customers/484296/selling/current?limit=100')
        // .get(`${URL}/v1/customers/${customerId}/selling/current?limit=500`)
        .set('jwt-authorization', process.env.STOCKX_API_JWT_TOKEN)
        .set('x-api-key', process.env.STOCKX_API_KEY)
        .end((err, res) => {
          if (err) {
            return err
          } else {
            inventory = res.body;
            return inventory;
            // console.log(res.body)
          }
        })
    } catch (error) {
      throw Error(`There was an error deleting portfolio item from StockX: ${error}`);
    }
    // console.log(inventory)
  };

  public loginWithEnv = async (email: string): Promise<Error | any> => {
    let loginResponse;
    try {
      // return this.axios.post('/stage/v1/login', { email, password });
      superagent
      .post(process.env.STOCKX_ENDPOINT + 'login')
      .send({ email: process.env.STOCKX_EMAIL, password: process.env.STOCKX_PASSWORD })
      .set('x-api-key', process.env.STOCKX_API_KEY)
      .end((err, res) => {
        if (err) {
          return err
        } else {
          loginResponse = res.header['jwt-authorization'];
          return loginResponse;
        }
      })
    }
    catch (error) {
      throw Error(`There was an error logging into StockX: ${error}`);
    }
  };

  public queryStockXByString = async (query: string): Promise<Error | any> => {
    try {
      let response = superagent
        .get('https://gateway.stockx.com/public/v2/search?query=' + query)
          .set('jwt-authorization', process.env.STOCKX_API_JWT_TOKEN)
          .set('x-api-key', process.env.STOCKX_API_KEY)
          .then((res) => {
            return res.body
          })
          return response
    } catch (error) {
      throw Error(`There was an error deleting portfolio item from StockX: ${error}`);
    }
    // console.log(inventory)
  };

  public queryStockXByStyleAndSize = async (styleId: string, size: string): Promise<Error | any> => {
    try {
      let response = superagent
        .get('https://gateway.stockx.com/public/product/lookup?identifier='+ styleId + '&size=' + size)
          .set('jwt-authorization', process.env.STOCKX_API_JWT_TOKEN)
          .set('x-api-key', process.env.STOCKX_API_KEY)
          .then((err, res) => {
            if (err) {
              // console.log("Superagent returns an error: ", err)
              return response = err
            } else {
              // console.log("Superagent response: ", res.body)
              return response.body
            }            
          })
          return response
    } catch (error) {
      throw Error(`There was an error deleting portfolio item from StockX: ${error}`);
    }
  };

  // This returns market data. You will need the product's uuid and sku to retreive it.
  public queryStockXMarketData =  async ( productUUID: String, productSKU: String): Promise<Error | any> => {
    try {
      let response = superagent
      .get('https://gateway.stockx.com/public/v1/products/' + productUUID + '/market?children=' + productSKU)
        .set('jwt-authorization', process.env.STOCKX_API_JWT_TOKEN)
        .set('x-api-key', process.env.STOCKX_API_KEY)
        .then((data) => {
          return data.body
        })
        return response
      } catch (error) {
        throw Error(`There was an error deleting portfolio item from StockX: ${error}`);
      }
    }; 

}
