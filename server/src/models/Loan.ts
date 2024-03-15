import mongoose from 'mongoose';

const loanSchema = new mongoose.Schema({
    fund: {type: mongoose.Schema.Types.ObjectId, ref: 'fund'},
    amount: {type: Number, required: true},
    interest: {type: Number, required: true},
    duration: {type: Number, required: true},
    created: {type: Date, default: Date.now},
    status: {type: String, required: true, default: 'pending'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
});

export default mongoose.model('loan', loanSchema);