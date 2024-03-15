import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    from: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    to: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    amount: {type: Number, required: true},
    created: {type: Date, default: Date.now}
});

export default mongoose.model('payment', paymentSchema);