// import dbconnect, { collectionNames } from "@/lib/dbConnect";
// import { NextResponse } from "next/server";

// // POST -> add to cart
// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { userId, foodId, name, price, image, restaurant, qty } = body;

//     if (!userId || !foodId) {
//       return NextResponse.json({ success: false, error: "userId and foodId are required" }, { status: 400 });
//     }

//     const cartCollection = await dbconnect(collectionNames.CART_DATA);

//     const result = await cartCollection.insertOne({
//       userId,
//       foodId,
//       name,
//       price,
//       image,
//       restaurant,
//       qty: qty || 1,
//       createdAt: new Date(),
//     });

//     return NextResponse.json({ success: true, cartId: result.insertedId.toString() });
//   } catch (error) {
//     console.error("Error adding to cart:", error);
//     return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
//   }
// }

// // GET -> get all cart items for user
// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const userId = searchParams.get("userId");

//     if (!userId) {
//       return NextResponse.json({ success: false, error: "userId query param required" }, { status: 400 });
//     }

//     const cartCollection = await dbconnect(collectionNames.CART_DATA);
//     const cartItems = await cartCollection.find({ userId }).sort({ createdAt: -1 }).toArray();

//     return NextResponse.json({ success: true, cart: cartItems });
//   } catch (error) {
//     console.error("Error fetching cart:", error);
//     return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
//   }
// }

import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

// POST /api/cart => add to cart
export async function POST(req) {
  try {
    const body = await req.json();
    const { userEmail, foodId, name, price, image, restaurant, qty } = body;

    if (!userEmail || !foodId || !name || !price) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }

    const cartCollection = dbConnect(collectionNames.CART_DATA);

    // Check if item already exists for user
    const existing = await cartCollection.findOne({ userEmail, foodId });
    if (existing) {
      // Update quantity
      await cartCollection.updateOne(
        { userEmail, foodId },
        { $inc: { qty: qty || 1 } }
      );
      return NextResponse.json({ success: true, message: "Cart updated" });
    }

    // Insert new cart item
    const result = await cartCollection.insertOne({
      userEmail,
      foodId,
      name,
      price,
      image,
      restaurant,
       status: "unpaid",
      qty: qty || 1,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, cartId: result.insertedId.toString() });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

// GET /api/cart?email=user@example.com => get cart by user
export async function GET(req) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    if (!email) {
      return NextResponse.json({ success: false, error: "Email is required" }, { status: 400 });
    }

    const cartCollection = dbConnect(collectionNames.CART_DATA);
    const cartItems = await cartCollection.find({ userEmail: email }).toArray();

    return NextResponse.json({ success: true, cart: cartItems });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
