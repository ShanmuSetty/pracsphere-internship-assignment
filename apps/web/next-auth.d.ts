import { DefaultSession } from "next-auth";

// Extend the default session type
declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & {
      id: string;
    };
  }
}