// import dbconnet, { collectionNames } from "@/lib/dbConnect";
// import { NextResponse } from "next/server";


// // POST /api/foods
// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { name, description, price, category, rating, image } = body;

//     if (!name || !description || !price || !category || !rating) {
//       return NextResponse.json(
//         { success: false, error: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     // DB connect
//     const foodsCollection = dbconnet(collectionNames.FOOD_DATA);

//     // Insert into DB
//     const result = await foodsCollection.insertOne({
//       name,
//       description,
//       price,
//       category,
//       rating,
//       image: image || null,
//       createdAt: new Date(),
//     });

//     return NextResponse.json({
//       success: true,
//       foodId: result.insertedId.toString(),
//     });
//   } catch (error) {
//     console.error("Error adding food:", error);
//     return NextResponse.json(
//       { success: false, error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   try {
//     const foodsCollection = dbconnet(collectionNames.FOOD_DATA);

//     const foods = await foodsCollection.find({}).sort({ createdAt: -1 }).toArray();

//     return NextResponse.json({ success: true, foods });
//   } catch (error) {
//     console.error("Error fetching foods:", error);
//     return NextResponse.json(
//       { success: false, error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import dbconnet, { collectionNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

// POST /api/foods
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, description, price, category, rating, image, restaurant,cuisine } = body;

    if (!name || !description || !price || !category || !rating || !restaurant || !cuisine) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // DB connect
    const foodsCollection = dbconnet(collectionNames.FOOD_DATA);

    // Insert into DB
    const result = await foodsCollection.insertOne({
      name,
      restaurant, // Added restaurant
      description,
      price,
      category,
      rating,
      cuisine,
      image: image || null,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      foodId: result.insertedId.toString(),
    });
  } catch (error) {
    console.error("Error adding food:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// GET /api/foods
export async function GET() {
  try {
    const foodsCollection = dbconnet(collectionNames.FOOD_DATA);

    const foods = await foodsCollection.find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ success: true, foods });
  } catch (error) {
    console.error("Error fetching foods:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
