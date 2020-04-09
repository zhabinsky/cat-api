import mongoose from 'mongoose';

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

export { Schema, Model };
