// import dbconnet, { collectionNames } from "@/lib/dbConnect";


// export async function POST(req) {
//   const data = await req.json();
//   const ridersCollection = dbconnet(collectionNames.RIDERS_DATA);

//   const result = await ridersCollection.insertOne(data);

//   return new Response(
//     JSON.stringify({ success: true, id: result.insertedId }),
//     { status: 200 }
//   );
// }

import dbconnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// 📌 Create new rider request
export async function POST(req) {
  try {
    const data = await req.json();
    const ridersCollection = await dbconnect(collectionNames.RIDERS_DATA);

    const result = await ridersCollection.insertOne({
      ...data,
      role: "user",      // default role
      status: "pending", // default status
    });

    return NextResponse.json(
      { success: true, id: result.insertedId },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// 📌 Get all riders (for admin panel)
export async function GET() {
  try {
    const ridersCollection = await dbconnect(collectionNames.RIDERS_DATA);
    const riders = await ridersCollection.find({}).toArray();

    return NextResponse.json({ success: true, riders }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// 📌 Approve rider request
export async function PATCH(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing rider ID" },
        { status: 400 }
      );
    }

    const ridersCollection = await dbconnect(collectionNames.RIDERS_DATA);
    const usersCollection = await dbconnect(collectionNames.TEST_USER); // user DB

    // ✅ Update rider in riders collection
    const riderResult = await ridersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { role: "rider", status: "approved" } }
    );

    // ✅ Find rider email
    const rider = await ridersCollection.findOne({ _id: new ObjectId(id) });
    if (!rider) {
      return NextResponse.json(
        { success: false, error: "Rider not found" },
        { status: 404 }
      );
    }

    // ✅ Update role in users collection
    await usersCollection.updateOne(
      { email: rider.email },
      { $set: { role: "rider" } }
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
