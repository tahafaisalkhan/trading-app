import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const tradeSchema = new Schema({
  name: {type: String, required: true},
  title: { type: String, required: true },
  description: { type: String, required: true },
  conditions: [{ type: String }],
  price: { type: String },
  offers: [{ type: Schema.Types.ObjectId, ref: 'Offer' }], 
  acceptedOffer: { type: Schema.Types.ObjectId, ref: 'Offer' },
  status: { type: String, default: 'active' }  // active, completed
});

const Trade = model('Trade', tradeSchema);
export default Trade;