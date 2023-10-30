import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        // You can add your read and write operations here
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
    }
};

