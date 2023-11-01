
import mongoose, {Schema,models} from "mongoose";

const bookingSchema = new Schema({
    parking: {
        type: Schema.Types.ObjectId,
        ref: "parkings", 
    },
    bookingTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
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
    },
    { timestamps: true }
)

const Bookings = models.Booking || mongoose.model("bookings",bookingSchema);
export default Bookings;