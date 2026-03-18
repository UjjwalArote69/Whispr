import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
}

let isConnected = false;

export const connectDB = async () => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("MONGODB is already connected");
        return;
    }
    
    try {
        await mongoose.connect(MONGODB_URI);
        isConnected = true;
        console.log("MONGODB connected successfully");
    } catch (error) {
        console.log("Error connecting to MONGODB: ", error);
        
    }
};