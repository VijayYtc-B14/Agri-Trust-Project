import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  phone: { type: String, required: [true, 'Phone is required'] },
  email: { type: String, required: [true, 'Email is required'], unique: true, lowercase: true },
  password: { type: String, required: [true, 'Password is required'] },
  location: { type: String },
  crops: { type: String },
  createdAt: { type: Date, default: Date.now },
}, {
  timestamps: true
});

// Create index for email
farmerSchema.index({ email: 1 });

export default mongoose.model("Farmer", farmerSchema);