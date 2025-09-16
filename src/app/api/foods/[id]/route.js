
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import dbconnet, { collectionNames } from "@/lib/dbConnect";

// GET /api/foods/[id]
export async function GET(req, { params }) {
  try {
    const { id } = params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, error: "Invalid ID" }, { status: 400 });
    }

    const foodsCollection = dbconnet(collectionNames.FOOD_DATA);

    const food = await foodsCollection.findOne({ _id: new ObjectId(id) });

    if (!food) {
      return NextResponse.json({ success: false, error: "Food not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, food });
  } catch (error) {
    console.error("Error fetching single food:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
