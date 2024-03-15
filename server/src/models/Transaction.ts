import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    amount: {type: Number, required: true},
    by: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    type: {type: String, required: true},
    created: {type: Date, default: Date.now},
});

export default mongoose.model('transaction', transactionSchema);