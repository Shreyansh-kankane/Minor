import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Parkings from "@/models/parking";

export async function POST(req, res){
    try {
        const { email,parkingName,street,city,state } = await req.json();
        const db = await connectMongoDB(); 

        const newParking = new Parkings({
            parkingName,
            email,
            address:{
                street,
                city,
                state
            }
        });
        const parking = await newParking.save();
        return NextResponse.json({ parking:parking }, { status: 200 });
        
    } catch (error) {
        console.log(error);
    }
}