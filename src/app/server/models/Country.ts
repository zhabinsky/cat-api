import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
    name: String,
    capital: String,
});

const Model = mongoose.model('Country', Schema);

export default { Schema, Model };

export interface CountryObject extends Document {
    name: string;
    capital: string;
}
