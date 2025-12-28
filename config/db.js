import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDB = async () => {
    // URI for MongoDB connection
    const uri = process.env.MONGO_DB_URI;

    // Connect to MongoDB
    await mongoose.connect(uri).then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
}