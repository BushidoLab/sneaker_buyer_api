import { model, Schema } from 'mongoose';
import { item } from './Item';

export const Accessories = item.discriminator('pants', new Schema({}));
