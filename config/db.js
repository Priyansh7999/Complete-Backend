import mongoose from "mongoose";
export const connectDB = async () => {
    // URI for MongoDB connection
    const MONGO_DB_URI = "mongodb+srv://priyanshsaxena7999:FnW$3H216@cluster1.yt59igm.mongodb.net/express"
    const uri = "mongodb+srv://priyanshsaxena7999:FnW$3H216@cluster1.yt59igm.mongodb.net/?appName=Cluster1";

    // Connect to MongoDB
    await mongoose.connect(uri).then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

}