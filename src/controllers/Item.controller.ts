import { ShopifyService, StockXService } from '../services';
import { ApolloError } from 'apollo-server';
import { IItem, IAddProduct } from '../types';
import { Item } from '../database';

export class ItemController {
  private readonly shopifyService;
  // private readonly stockXService;

  constructor() {
    this.shopifyService = new ShopifyService();
    // this.stockXService = new StockXService();
  }

  public async create(item: IItem): Promise<any> {
    return Promise.all([
      this.shopifyService.addNewProduct(this.shopifyRequestBody(item)),
      Item.create(this.mongoSchema(item))
    ]);
  }

  public async get(): Promise<any> {
    return Item.find();
  }

  private shopifyRequestBody(item: IItem): IAddProduct {
    const { title, vendor, productType, variants } = item;
    return {
      title,
      vendor,
      productType,
      ...(variants && { variants })
    };
  }

  private mongoSchema(item: IItem) {
    const { productType, title, vendor, purchasePrice } = item;
    return {
      productType,
      title,
      vendor,
      purchasePrice
    };
  }
}
