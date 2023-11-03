import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Parkings from "@/models/parking";


export async function POST(req, res) {
  let db;
  try {
    const { email, car, bike, truck } = await req.json();
    db = await connectMongoDB();

    // Create an object to store the updates
    const updates = {};

    // Check if the car object has values and add them to the updates object
    if (car && car.slots !== '' && car.price !== '') {
      updates['car.slots'] = car.slots;
      updates['car.price'] = car.price;
    }

    // Repeat the same for the bike and truck objects
    if (bike && bike.slots !== '' && bike.price !== '') {
      updates['bike.slots'] = bike.slots;
      updates['bike.price'] = bike.price;
    }

    if (truck && truck.slots !== '' && truck.price !== '') {
      updates['truck.slots'] = truck.slots;
      updates['truck.price'] = truck.price;
    }

    // Update the database record with the non-empty values
    const parking = await Parkings.findOneAndUpdate(
      { email: email },
      { $set: updates },
      { new: true }
    );

    return NextResponse.json({ parking: parking }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
