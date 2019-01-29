import { Item, Pants, Accessories, Shoes } from '../src/database';

suite('Item data model validations', () => {
  test.only('it should be invalid if it has no id', async () => {
    const item = await new Item({
      id: '1234',
      title: 'test title',
      vendor: 'shopify',
      purchasePrice: 1234,
      closingPrice: 1234,
      productType: 'PANTS'
    });
    console.log(item);
  });
});
