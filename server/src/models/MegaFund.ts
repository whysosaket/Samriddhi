import mongoose from 'mongoose';

const megafundSchema = new mongoose.Schema({
    name: {type: String, required: true},
    members: {type: [mongoose.Schema.Types.ObjectId], ref: 'fund'},
    balance: {type: Number, required: true, default: 0},
    village: {type: String, required: true},
    admins: {type: [mongoose.Schema.Types.ObjectId], ref: 'user'}
});

export default mongoose.model('megafund', megafundSchema);