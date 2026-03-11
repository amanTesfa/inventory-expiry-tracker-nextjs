import mongoose from "mongoose";

const SupplierSchema = new mongoose.Schema({
  // Define your supplier schema fields here
});

export default mongoose.models.Supplier || mongoose.model("Supplier", SupplierSchema);
