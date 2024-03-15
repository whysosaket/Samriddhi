import mongoose from 'mongoose';

const fundSchema = new mongoose.Schema({
    name: {type: String, required: true},
    members: {type: [mongoose.Schema.Types.ObjectId], ref: 'user'},
    balance: {type: Number, required: true, default: 0},
    admins: {type: [mongoose.Schema.Types.ObjectId], ref: 'user'},
    transactions: {type: [mongoose.Schema.Types.ObjectId], ref: 'transaction'},
    generalInterest: {type: Number, required: true, default: 2.5},
    created: {type: Date, default: Date.now},
});

export default mongoose.model('fund', fundSchema);