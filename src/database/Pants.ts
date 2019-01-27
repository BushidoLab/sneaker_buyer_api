import { model, Schema } from 'mongoose';
import { item } from './Item';

export const Pants = item.discriminator('pants', 
    new Schema({
        pantSize: { type: 'string', required: true, }
    })
)