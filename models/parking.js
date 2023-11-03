
import mongoose, { Schema, models } from "mongoose";

const parkingSchema = new Schema({
    parkingName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    location: {
      type: [Number], // Assuming you're storing coordinates as an array of numbers
    },
    address: {
      street: String, // Define subfields as needed (e.g., street, city, state)
      city: String,
      state: String,
    },
    isOnline: {
      type: Boolean,
      default: true
    },
    car: {
      price: {
        type: Number,
        default: 0, // Set the default price to 0 or your desired default value
      },
      slots: {
        type: Number,
        default: 0, // Set the default slots to 0 or your desired default value
      },
    },
    bike: {
      price: {
        type: Number,
        default: 0, // Set the default price to 0 or your desired default value
      },
      slots: {
        type: Number,
        default: 0, // Set the default slots to 0 or your desired default value
      },
    },
    truck:{
      price: {
        type: Number,
        default: 0, // Set the default price to 0 or your desired default value
      },
      slots: {
        type: Number,
        default: 0, // Set the default slots to 0 or your desired default value
      },
    }
  },
  { timestamps: true }
);
  

const Parkings = models.Parkings || mongoose.model("Parkings", parkingSchema);
export default Parkings;
