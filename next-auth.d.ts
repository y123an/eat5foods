import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";
import { Role } from "@prisma/client";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      image: string | null | undefined;
      name: string;
      email: string;
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    role: Role;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: Role;
  }
}
