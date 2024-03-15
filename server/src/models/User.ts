import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    balance: {type: Number, required: true, default: 0},
    fund: {type: mongoose.Schema.Types.ObjectId, ref: 'fund'},
    annualIncome: {type: Number, required: true},
});

export default mongoose.model('user', userSchema);