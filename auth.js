import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import clientPromise from "./lib/mongoclient";
import authConfig from "./auth.config.ts";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role;
      }
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  ...authConfig,
});
