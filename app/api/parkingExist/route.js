import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    let db;
    try {
        const { email } = await req.json();
        db = await connectMongoDB();
        const parking = await db.collection("parkings").findOne({ email });

        if (!parking) {
            NextResponse.json({ message: "parking not exists" }, { status: 401 });
        }
        return NextResponse.json({ parking: parking }, { status: 200 });

    } catch (error) {
        console.log(error);
    }
}
