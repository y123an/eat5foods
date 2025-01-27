import authOptions from "@/app/api/auth/[...nextauth]/auth-options";
import { getServerSession } from "next-auth/next";
import { prisma } from "./prisma-client";

export const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return null;
  }
};
