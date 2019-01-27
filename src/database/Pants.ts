import { model, Schema } from 'mongoose';
import { Item } from './Item';

export const Pants = Item.discriminator(
  'pants',
  new Schema({
    pantSize: { type: 'string', required: true }
  })
);
