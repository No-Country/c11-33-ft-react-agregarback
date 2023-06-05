import {
  type Session as NextAuthSession,
  type User as NextAuthUser,
} from "next-auth";

declare module "next-auth" {
  export interface User extends NextAuthUser {
    id: string;
  }

  export interface Session extends NextAuthSession {
    user: User;
  }
}
