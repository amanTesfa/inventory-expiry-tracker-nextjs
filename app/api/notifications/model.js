import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  // Define your notification schema fields here
});

export default mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);
