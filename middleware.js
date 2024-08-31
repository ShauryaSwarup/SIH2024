import NextAuth from "next-auth";
import authConfig from "./auth.config.ts";

export const { auth: middleware } = NextAuth(authConfig);
