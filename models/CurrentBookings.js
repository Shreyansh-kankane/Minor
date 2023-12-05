
import mongoose, { Schema, models } from "mongoose";

const currentBookingSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    user_email: {
        type: String,
        required: true,
    },
    vehicleType: {
        type: String,
        required: true,
    },
    bookingTime: {
        type: Number,
        required: true,
    },
    endTime: {
        type: Number,
        required: true,
    },
    vehicleNumber: {
        type: String,
        required: true,
    },
    bookedSlotNumber: {
        type: Number,
        default: -1,
    },
    inParking: {
        type: Number,
        default: 0,
    },
},
    { timestamps: true }
)

const CurrentBookings =  models.CurrentBookings || mongoose.model("CurrentBookings", currentBookingSchema);
export default CurrentBookings;