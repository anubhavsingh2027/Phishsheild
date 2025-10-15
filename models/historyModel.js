import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true }, 
  details: String,
  url: String,     
  result: String, 
  timestamp: { type: Date, default: Date.now }
});

const History = mongoose.model('History', historySchema);

export default History;