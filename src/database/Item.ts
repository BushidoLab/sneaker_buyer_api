import { model, Schema } from 'mongoose';

const itemSchema = new Schema({
  id: { type: String, required: true },
  shopifyProductId: { type: String, required: true },
  stockXProductId: { type: String, required: true },
  title: { type: String, required: true },
  vendor: { type: String, required: true },
  productType: { type: String, required: true }
});

export const item = model('item', itemSchema);
