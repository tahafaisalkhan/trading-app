import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const offerSchema = new Schema({
    trade: { type: Schema.Types.ObjectId, ref: 'Trade', required: true },
    name: {type: String, required: true}, 
    commodity: {type: String, required: true},
    description: {type: String, required: false},
    quantity: {type: Number},
    cashOffer: {type: Number},
    status: { type: String, default: 'Pending' },  // Pending, Accepted, Rejected
    visibleToOwner: { type: Boolean, default: true }
});

const Offer = mongoose.model('Offer', offerSchema);

export default Offer;