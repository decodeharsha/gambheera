import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  location: String,
  price: Number,
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Service", serviceSchema);
