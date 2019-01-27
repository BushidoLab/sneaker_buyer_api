import { model, Schema } from 'mongoose';
import { Item } from './Item';

export const Shoes = Item.discriminator('shoes', 
    new Schema({
        shoeSize: { type: 'string', required: true, }
    })
)