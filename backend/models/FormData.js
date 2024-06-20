import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const FormDataSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    noOfItemsOwned: { type: Number, default: 10000},
    cashOwned: {type: Number, default: 10000}, 
    createdTrades: [{ type: Schema.Types.ObjectId, ref: 'Trade' }],
    createdOffers: [{ type: Schema.Types.ObjectId, ref: 'Offer' }]
});

const FormDataModel = mongoose.model('userslist', FormDataSchema);

export default FormDataModel;
