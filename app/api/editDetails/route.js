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
    const myPark = await Parkings.findOne({ email: email });

    if (car && (car.slots !== ''|| car.price !== '')) {

      if(car.price !== ''){
        updates['car.price'] = car.price;
      }
      if(car.slots !== '') {
        updates['car.slots'] = car.slots;
        const arr = [];
        let index=0;
        for (let i = 0; i < car.slots; i++) {
          let ans = true;
          for (let j = 0; j < myPark.car.booked.length; j++) {
            if (myPark.car.booked[j] === i + 1) {
              ans = false;
              break;
            }
          }
          if (ans) {
            arr[index++] = i + 1;
          }
        }
        updates['car.available'] = arr;
      }
    }

    // Repeat the same for the bike and truck objects

    if (bike && (bike.slots !== '' || bike.price !== '')) {
      if(bike.price !== ''){
        updates['bike.price'] = bike.price;
      }
      if(bike.slots !== '') {
        updates['bike.slots'] = bike.slots;
        const arr = [];
        let index=0;
        for (let i = 0; i < bike.slots; i++) {

          let ans = true;
          for (let j = 0; j < myPark.bike.booked.length; j++) {
            if (myPark.bike.booked[j] === i + 1) {
              ans = false;
              break;
            }
          }
          if (ans) {
            arr[index++] = i + 1;
          }
        }
        updates['bike.available'] = arr;
      }
        
    }

    if (truck && (truck.slots !== '' || truck.price !== '')) {
      if(truck.price !== ''){
        updates['truck.price'] = truck.price;
      }
      if(truck.slots !== '') {
        updates['truck.slots'] = truck.slots;
        const arr = [];
        let index=0;
        for (let i = 0; i < truck.slots; i++) {
          let ans = true;
          for (let j = 0; j < myPark.truck.booked.length; j++) {
            if (myPark.truck.booked[j] === i + 1) {
              ans = false;
              break;
            }
          }
          if (ans) {
            arr[index++] = i + 1;
          }
        }
        updates['truck.available'] = arr;
      }
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
