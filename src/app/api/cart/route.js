

import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // 🔹 Update status after payment
    if (body.updateStatus) {
      const { userEmail, foodId, status } = body;
      if (!userEmail || !foodId || !status) {
        return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
      }

      const cartCollection = await dbConnect(collectionNames.CART_DATA);
      await cartCollection.updateOne(
        { userEmail, foodId },
        { $set: { status } }
      );
      return NextResponse.json({ success: true, message: "Cart status updated" });
    }

    // 🔹 Add to cart
    const { userEmail, foodId, name, price, image, restaurant, qty } = body;
    if (!userEmail || !foodId || !name || !price) {
      return NextResponse.json({ success: false, error: "Missing fields" }, { status: 400 });
    }

    const cartCollection = await dbConnect(collectionNames.CART_DATA);
    const existing = await cartCollection.findOne({ userEmail, foodId });

    if (existing) {
      await cartCollection.updateOne({ userEmail, foodId }, { $inc: { qty: qty || 1 } });
      return NextResponse.json({ success: true, message: "Cart updated" });
    }

    const result = await cartCollection.insertOne({
      userEmail,
      foodId,
      name,
      price,
      image,
      restaurant,
      qty: qty || 1,
      status: "unpaid",
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, cartId: result.insertedId.toString() });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const email = req.nextUrl.searchParams.get("email");
    if (!email) return NextResponse.json({ success: false, error: "Email required" }, { status: 400 });

    const cartCollection = await dbConnect(collectionNames.CART_DATA);
    const cartItems = await cartCollection.find({ userEmail: email }).toArray();

    return NextResponse.json({ success: true, cart: cartItems });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
