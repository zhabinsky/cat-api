import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
	name: String,
	capital: String
});

const Model = mongoose.model('Country',Schema);

export {
	Schema,
	Model
};