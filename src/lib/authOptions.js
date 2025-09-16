import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";



import dbconnet, { collectionNames } from "./dbConnect";
import { LoginUser } from "@/app/actions/auth/loginUser";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await LoginUser(credentials);

        if (user?.error) throw new Error(user.error);
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
   
  ],
  pages: { signIn: "/login" },
  callbacks: {
    async signIn({ user, account }) {
      if (account) {
        const { providerAccountId, provider } = account;
        const { email, name, image } = user;

        const existing = await dbconnet(collectionNames.TEST_USER).findOne({ providerAccountId });
        if (!existing) {
          await dbconnet(collectionNames.TEST_USER).insertOne({
            provider,
            providerAccountId,
            user_email: email,
            name,
            image,
            role: "user",
          });
        }
      }
      return true;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};


