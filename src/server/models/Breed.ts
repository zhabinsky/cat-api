import mongoose, { Document } from 'mongoose';

const Schema = new mongoose.Schema({
    name: String,
    description: String,
    picture: String,
    votes: {
        type: Number,
        default: 0,
    },
    temperament: {
        type: String,
        enum: 'lazy|active|cuddly|playful'.split('|'),
    },
    origin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
    },
});

const Model = mongoose.model('Breed', Schema);

export default { Schema, Model };

export interface BreedDocument extends Document {
    name: string;
    description: string;
    picture: string;
    votes: number;
    temperament: string;
    origin: string;
}
