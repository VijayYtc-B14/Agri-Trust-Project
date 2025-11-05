import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String },
  crops: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Farmer", farmerSchema);
