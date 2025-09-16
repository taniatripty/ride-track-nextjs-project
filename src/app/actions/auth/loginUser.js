

"use server";


import dbconnet, { collectionNames } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export const LoginUser = async ({ email, password }) => {
  const usersCollection = dbconnet(collectionNames.TEST_USER);
  const user = await usersCollection.findOne({ email });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    image: user.image || null,
    role: user.role,
  };
};
