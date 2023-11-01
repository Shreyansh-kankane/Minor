import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        // Return the database object
        return mongoose.connection.db;
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
        throw error;
    }
};
