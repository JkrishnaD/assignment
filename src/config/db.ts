import mongoose from "mongoose";
import "dotenv/config";
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Failed", error);
    process.exit(1);
  }
};

export default dbConnection;
