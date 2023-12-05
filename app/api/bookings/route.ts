import { connectMongoDB } from "@/lib/mongodb";
// import Bookings from "@/models/bookings";
import { NextResponse } from "next/server";
import CurrentBookings from "@/models/CurrentBookings"

export async function POST(req: Request,res: Response){
    try {
        const {email,inParking} = await req.json();
        await connectMongoDB();

        const result = await CurrentBookings.find({email: email,inParking: inParking});
        
        if(!result || result.length == 0){
            return NextResponse.json({message:"No bookings found"},{status:201})
        }

        const formattedBookings = result.map((booking) => ({
            _id: booking._id,
            vehicleType: booking.vehicleType,
            vehicleNumber: booking.vehicleNumber,
            bookingTime: formatEpochTime(booking.bookingTime),
            endTime: formatEpochTime(booking.endTime),
            email: booking.email,
            bookedSlotNumber: booking.bookedSlotNumber,
            user_email: booking.user_email
        }));
      
        return NextResponse.json({ bookings: formattedBookings }, { status: 200 });

        // return NextResponse.json({bookings:result},{status:200});     
        
    } catch (error) {
        console.log(error);
    }
}

function formatEpochTime(epochTime) {
   // DateTime.fromMillisecondsSinceEpoch(1234567890123, isUtc: true).toString();
  const dateObj = new Date(0); // Convert to milliseconds
  dateObj.setTime(Math.floor(epochTime/1000))
  return dateObj.toLocaleString();
}