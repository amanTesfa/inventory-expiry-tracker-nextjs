import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
  // Define your report schema fields here
});

export default mongoose.models.Report || mongoose.model("Report", ReportSchema);
