

"use server";

import dbconnet, { collectionNames } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export const registerUser = async ({ name, email, password,image }) => {
  if (!name || !email || !password) return { error: "All fields are required" };

  const usersCollection = dbconnet(collectionNames.TEST_USER);
  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) return { error: "User already exists" };

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await usersCollection.insertOne({ name, email,image:image, password: hashedPassword, role: "user" });
  result.insertedId = result.insertedId.toString();

  return { success: true, userId: result.insertedId };
};
