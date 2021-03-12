import mongoose from 'mongoose';
import { Book } from './Book';

export const Author = mongoose.model('Author', { 
    name: String
});