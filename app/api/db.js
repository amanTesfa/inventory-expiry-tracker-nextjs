import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/inventory";

export async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
