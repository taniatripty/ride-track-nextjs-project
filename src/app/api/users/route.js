
import dbconnet, { collectionNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const usersCollection = dbconnet(collectionNames.TEST_USER);
    const users = await usersCollection.find({}).toArray();
    return NextResponse.json({ success: true, users });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
