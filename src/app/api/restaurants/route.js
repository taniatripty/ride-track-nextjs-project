
import dbconnet, { collectionNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

// POST /api/restaurants
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, location, image } = body;

    if (!name || !location) {
      return NextResponse.json(
        { success: false, error: "Name and Location are required" },
        { status: 400 }
      );
    }

    const restaurantsCollection = dbconnet(collectionNames.RESTURANT);

    const result = await restaurantsCollection.insertOne({
      name,
      location,
      image: image || null,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error("Error adding restaurant:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET /api/restaurants
export async function GET() {
  try {
    const restaurantsCollection = dbconnet(collectionNames.RESTURANT);
    const restaurants = await restaurantsCollection.find().toArray();
    return NextResponse.json({ success: true, data: restaurants });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
