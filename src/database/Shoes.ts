import { model, Schema } from 'mongoose';
import { item } from './Item';

export const Shoes = item.discriminator('shoes', 
    new Schema({
        shoeSize: { type: 'string', required: true, }
    })
)