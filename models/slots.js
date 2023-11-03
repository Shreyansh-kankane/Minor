

import mongoose, { Schema, models } from "mongoose";

const slotsSchema = new Schema({
    parking: {
        type: Schema.Types.ObjectId,
        ref: "parkings",
    },
    bookedSlots: {
        type: [Number],
        default: 0,
    },
    AvailableSlots:{
        type: [Number],
        default: 0,
    }

},
    { timestamps: true }
)

const Slots = models.Bookings || mongoose.model("Slots", slotsSchema);
export default Slots;