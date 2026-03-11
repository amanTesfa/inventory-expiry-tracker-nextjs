import mongoose from "mongoose";

const BatchSchema = new mongoose.Schema({
  // Define your batch schema fields here
});

export default mongoose.models.Batch || mongoose.model("Batch", BatchSchema);
