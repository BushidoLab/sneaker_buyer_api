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
      let response = superagent
      .post(process.env.STOCKX_ENDPOINT + 'login')
      .send({ email: email, password: password })
      .set('x-api-key', process.env.STOCKX_API_KEY)
      .then((err, res) => {
        if (err) {
          return err
        } else {
          loginResponse = res.header['jwt-authorization'];
          return loginResponse;
        }
      })
      return response
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

  public loginWithEnv = async (email: string): Promise<Error | any> => {
    try {
      let response = await superagent
      .post("https://gateway.stockx.com/sandbox/v1/" + 'login')
      .send({ email: process.env.STOCKX_EMAIL, password: process.env.STOCKX_PASSWORD })
      .set('x-api-key', process.env.STOCKX_API_KEY)
      .then((err, res) => {
        if (err) {
          return err
        } else {
          // loginResponse = res.header['jwt-authorization'];
          // console.log(res)
          return res
        }
      })
      console.log(response.body)
      return response;
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
              console.log("Superagent returns an error: ", err)
              return response = err
            } else {
              console.log("Superagent response: ", response.body)
              return response.body.data.queryStockXByStyleAndSize.text
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

    public queryStockXByStyleAndAllSizes = async (styleId: string): Promise<Error | any> => {
      try {
        // let possibleSizes = ['3.5','4','4.5','5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13','13.5','14','15','16','17','18'];
        let possibleSizes = ['7','7.5','8','8.5','9'];
        let collection = [];
        let object;
        for (var size in possibleSizes) {
          let response = await superagent
            .get('https://gateway.stockx.com/public/product/lookup?identifier='+ styleId + '&size=' + possibleSizes[size])
              .set('jwt-authorization', process.env.STOCKX_API_JWT_TOKEN)
              .set('x-api-key', process.env.STOCKX_API_KEY)
              .then((err, res) => {
                if (err) {
                  // console.log("Superagent returns an error: ", err)
                  return response = err
                } else {
                  // console.log("Superagent response: ", response.body)
                  console.log(response)
                  return res.body.data.queryStockXByStyleAndSize.text
                }            
              })
              let data = JSON.parse(response.text)
              object = {
                size: possibleSizes[size],
                payload: data
              }
              // collection.push(await response)
              collection.push(await object)
        }

        return collection
            // console.log(collection)
      } catch (error) {
        throw Error(`There was an error deleting portfolio item from StockX: ${error}`);
      }
    };

      // This returns market data. You will need the product's uuid and sku to retreive it.
  public queryGetAllShoeData =  async ( styleId: string): Promise<Error | any> => {
    try {
      let shoeData;
      let shoeDataArray = [];
      let valueAndSizes = await this.queryStockXByStyleAndAllSizes(styleId);
      for (let i = 0; i < valueAndSizes.length; i++) {
        let UUID = valueAndSizes[i].payload.data[0].attributes.product_uuid;
        let SKU = valueAndSizes[i].payload.data[0].id;
        let marketData = await this.queryStockXMarketData(UUID, SKU)
        let shoeData = {
          size: valueAndSizes[i].size,
          data: marketData
        }
        // console.log(shoeData)
        shoeDataArray.push(shoeData)
      }
      return shoeDataArray
      } catch (error) {
        throw Error(`There was an error deleting portfolio item from StockX: ${error}`);
      }
    }; 
    
    public getCurrentSelling = async (qty: string): Promise<Error | any> => {
      let inventory;
      try {
        let response = await superagent
          .get('https://gateway.stockx.com/sandbox/v1/customers/484296/selling/current?limit=500')
          // .get(`${URL}/v1/customers/${customerId}/selling/current?limit=500`)
          .set('jwt-authorization', process.env.STOCKX_API_JWT_TOKEN)
          .set('x-api-key', process.env.STOCKX_API_KEY)
          .then((err, res) => {
            if (err) {
              return err
            } else {
              // console.log(res)
              // console.log(res.body)
              return res
            }
          })
          // console.log(await response.body.text)
          return response.body
      } catch (error) {
        throw Error(`There was an error deleting portfolio item from StockX: ${error}`);
      }
      // console.log(inventory)
    };

  public createSellOrder = async (qty: string, expiresAt: string, productSKU: String): Promise<Error | any> => {
    let inventory;
    try {
      let response = await superagent
        .post('https://gateway.stockx.com/sandbox/v1/portfolio/ask')
        .set('jwt-authorization', process.env.STOCKX_API_JWT_TOKEN)
        .set('x-api-key', process.env.STOCKX_API_KEY)
        .send({
          "PortfolioItem": {
            "amount":     qty,
            "expiresAt":  expiresAt,
            "skuUuid":    productSKU
          }
        })
        .then((res) => {
          console.log(res)
        })
        return response
    } catch (error) {
      throw Error(`There was an error deleting portfolio item from StockX: ${error}`);
    }
  };


  // https://gateway.stockx.com/public/v1/portfolio
  public createPortfolioItem = async (qty: string, expiresAt: string, productSKU: String): Promise<Error | any> => {
    try {
      let response = await superagent
        .post('https://gateway.stockx.com/stage/v1/portfolio/ask')
        .set('jwt-authorization', process.env.STOCKX_API_JWT_TOKEN)
        .set('x-api-key', process.env.STOCKX_API_KEY)
        .send({
          "PortfolioItem": {
            "amount":     qty,
            "expiresAt":  expiresAt,
            "skuUuid":    productSKU
          }
        })
        .then((res) => {
          console.log(res)
        })
        return response
    } catch (error) {
      throw Error(`There was an error deleting portfolio item from StockX: ${error}`);
    }
  };

}



// 100% WORKING DONT BREAK
// public queryStockXByStyleAndAllSizes = async (styleId: string): Promise<Error | any> => {
//   try {
//     // let possibleSizes = ['3.5','4','4.5','5','5.5','6','6.5','7','7.5','8','8.5','9','9.5','10','10.5','11','11.5','12','12.5','13','13.5','14','15','16','17','18'];
//     let possibleSizes = ['7','7.5','8','8.5','9'];
//     let collection = [];
//     for (var size in possibleSizes) {
//       let response = superagent
//         .get('https://gateway.stockx.com/public/product/lookup?identifier='+ styleId + '&size=' + possibleSizes[size])
//           .set('jwt-authorization', process.env.STOCKX_API_JWT_TOKEN)
//           .set('x-api-key', process.env.STOCKX_API_KEY)
//           .then((err, res) => {
//             if (err) {
//               // console.log("Superagent returns an error: ", err)
//               return response = err
//             } else {
//               // console.log("Superagent response: ", response.body)
//               return response.body.data.queryStockXByStyleAndSize.text
//             }            
//           })
//           collection.push(await response)
//           // console.log(response)
//           this.justASimpleConsoleLog();
//           // return collection
//           // return response
//     }

//     return collection
//         // console.log(collection)
//   } catch (error) {
//     throw Error(`There was an error deleting portfolio item from StockX: ${error}`);
//   }
// };