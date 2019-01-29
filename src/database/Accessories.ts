import { model, Schema } from 'mongoose';
import { Item } from './Item';

export const Accessories = Item.discriminator('accessories', new Schema({}));
