import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  alertBeforeDays: { type: Number, default: 7 },
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
