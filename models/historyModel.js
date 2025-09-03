import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true }, // e.g., 'Login', 'Analyze'
  details: String, // Optional details
  url: String,     // The URL that was analyzed
  result: String,  // The result of the analysis (e.g., 'Safe', 'Phishing')
  timestamp: { type: Date, default: Date.now }
});

const History = mongoose.model('History', historySchema);

export default History;