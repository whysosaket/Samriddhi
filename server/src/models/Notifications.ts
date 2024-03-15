import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    message: {type: String, required: true},
    created: {type: Date, default: Date.now},
    read: {type: Boolean, default: false}
});

export default mongoose.model('notification', notificationSchema);
