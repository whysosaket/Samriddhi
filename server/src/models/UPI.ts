import mongoose from "mongoose";

const upiSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    dateN: { type: String, required: true },
});

export default mongoose.model('upi', upiSchema);