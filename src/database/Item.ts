import { model, Schema } from 'mongoose';

const itemTypes = ['PANTS', 'SHOES', 'ACCESSORIES'];
const itemSchema = new Schema({
  // id: { type: String, required: true },
  // TODO: Expand on available product types (ie: shoes, shirts, hats, accessories)
  productType: { type: String, enum: [...itemTypes], required: true },
  shopifyProductId: { type: String },
  // Record price for shopify listing
  shopifyListPrice: { type: Number },
  stockXProductId: { type: String },
  // Record price for stockx listing
  stockXListPrice: { type: Number },
  title: { type: String, required: true },
  vendor: { type: String, required: true },
  // User will declare item's original purchase price. Used later to calculate profit on item.
  purchasePrice: { type: Number, required: true },
  // Record closing price
  closingPrice: { type: Number }
  // TODO: Declare which storefront item was finally sold on (ie: Item was sold on Shopify or Stockx)
});

export const Item = model('item', itemSchema);
