// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";



// import dbconnet, { collectionNames } from "./dbConnect";
// import { LoginUser } from "@/app/actions/auth/loginUser";

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const user = await LoginUser(credentials);

//         if (user?.error) throw new Error(user.error);
//         return user;
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
   
//   ],
//   pages: { signIn: "/login" },
//   callbacks: {
//     async signIn({ user, account }) {
//       if (account) {
//         const { providerAccountId, provider } = account;
//         const { email, name, image } = user;

//         const existing = await dbconnet(collectionNames.TEST_USER).findOne({ providerAccountId });
//         if (!existing) {
//           await dbconnet(collectionNames.TEST_USER).insertOne({
//             provider,
//             providerAccountId,
//             user_email: email,
//             name,
//             image,
//             role: "user",
//           });
//         }
//       }
//       return true;
//     },
//   },
//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,
// };


import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import dbconnet, { collectionNames } from "./dbConnect";
import { LoginUser } from "@/app/actions/auth/loginUser";

export const authOptions = {
  providers: [
    // Credentials Login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password" },
      },
      async authorize(credentials) {
        const user = await LoginUser(credentials); // Returns {id, name, email, role, image}
        if (!user) throw new Error("Invalid credentials");
        return user;
      },
    }),

    // Google Login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: { strategy: "jwt" },

  callbacks: {
    // Runs at login and on subsequent requests
    async jwt({ token, user }) {
      const usersCollection = dbconnet(collectionNames.TEST_USER);

      // If first login (Credentials or Google)
      if (user?.email) {
        // Check DB for existing user
        let dbUser = await usersCollection.findOne({ email: user.email });

        if (!dbUser) {
          // New user (Google) → insert without password
          const newUser = {
            name: user.name,
            email: user.email,
            image: user.image || null,
            role: "user", // default role
          };
          const result = await usersCollection.insertOne(newUser);
          dbUser = { ...newUser, id: result.insertedId.toString() };
        } else {
          dbUser = {
            id: dbUser._id.toString(),
            name: dbUser.name,
            email: dbUser.email,
            image: dbUser.image || null,
            role: dbUser.role,
          };
        }

        token.role = dbUser.role;
        token.id = dbUser.id || dbUser._id?.toString();
      }

      // On every request, refresh role from DB to keep it up-to-date
      if (token?.email) {
        const dbUser = await usersCollection.findOne({ email: token.email });
        if (dbUser?.role) token.role = dbUser.role;
      }

      return token;
    },

    // Runs when session is accessed in client
    async session({ session, token }) {
      session.user.role = token.role || "user";
      session.user.id = token.id;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
