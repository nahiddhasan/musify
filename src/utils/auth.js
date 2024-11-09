import { PrismaAdapter } from "@auth/prisma-adapter";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./connect";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }), 
    ],
    callbacks: {
      async session({ token, session }) {
        if (token) {
          session.user.id = token.id;
          session.user.role = token.role;
        }
        return session;
      },
      async jwt({ token }) {
        const userInDb = await prisma.user.findUnique({
          where: {
            email: token.email,
          },
        });
       
        token.id = userInDb?.id;
        token.role = userInDb?.role;
        return token;
      },
    },
 

    
  };

export const getAuthSession = () => getServerSession(authOptions);