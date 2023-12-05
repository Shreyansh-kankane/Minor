import { connectMongoDB } from "@/lib/mongodb";
// import Bookings from "@/models/bookings";
import { NextResponse } from "next/server";
import CurrentBookings from "@/models/CurrentBookings"

export async function POST(req: Request,res: Response){
    try {
        const {email} = await req.json();
        await connectMongoDB();

        const result = await CurrentBookings.find({email: email});
        if(!result){
            return NextResponse.json({message:"No bookings found"},{status:201})
        }

        return NextResponse.json({bookings:result},{status:200});     
        
    } catch (error) {
        console.log(error);
    }
}
