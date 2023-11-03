import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Parkings from "@/models/parking";

export async function POST(req, res) {
  try {
    const { email, isOnline } = await req.json(); // Assuming you receive an object with 'email' and 'online' properties

    // Check if 'online' is a boolean
    if (typeof isOnline !== 'boolean') {
      return NextResponse.json({ error: 'Invalid online value' }, { status: 400 });
    }

    const db = await connectMongoDB();

    // Find the parking entity by email
    const parking = await Parkings.findOne({ email });

    if (!parking) {
      return NextResponse.json({ error: 'Parking not found' }, { status: 404 });
    }

    // Toggle the 'isOnline' property
    parking.isOnline = isOnline;

    // Save the updated parking entity
    await parking.save();

    return NextResponse.json({ parking: parking }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
