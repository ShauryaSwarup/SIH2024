import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Google({
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? "user",
        };
      },
      allowDangerousEmailAccountLinking: true,
    }),
  ],
} satisfies NextAuthConfig;
