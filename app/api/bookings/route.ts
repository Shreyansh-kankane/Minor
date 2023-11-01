import { connectMongoDB } from "@/lib/mongodb";
import Bookings from "@/models/Bookings";
import { NextResponse } from "next/server";

export async function POST(req: Request,res: Response){
    try {
        const {email} = await req.json();
        await connectMongoDB();

        const result = await Bookings.find({email});
        
        if(!result){
            return NextResponse.json({message:"No bookings found"},{status:201})
        }

        return NextResponse.json({parkingInfo:result},{status:200});     
        
    } catch (error) {
        console.log(error);
    }
}
