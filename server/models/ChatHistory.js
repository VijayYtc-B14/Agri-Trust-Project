import mongoose from 'mongoose';

const chatHistorySchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('ChatHistory', chatHistorySchema);