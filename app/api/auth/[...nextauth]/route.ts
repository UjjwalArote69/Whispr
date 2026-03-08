import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          await connectDB();
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(credentials.password, user.password);

          if (!passwordsMatch) {
            return null;
          }

          // Return the user object if successful (this gets stored in the session)
          return { id: user._id.toString(), name: user.username, email: user.email };
        } catch (error) {
          console.log("Error during authorization: ", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login", // Redirect here if auth fails
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };