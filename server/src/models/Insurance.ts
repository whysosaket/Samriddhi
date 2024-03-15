import mongoose from 'mongoose';

const insuranceSchema = new mongoose.Schema({
    policyNumber: {type: String, required: true},
    policyHolder: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    coverageAmount: {type: Number, required: true},
    premiumAmount: {type: Number, required: true},
    durationInMonths: {type: Number, required: true},
    startDate: {type: Date, required: true, default: Date.now},
    status: {type: String, required: true, default: 'active'},
});

export default mongoose.model('insurance', insuranceSchema);
