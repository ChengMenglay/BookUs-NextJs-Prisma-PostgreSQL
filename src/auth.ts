import authConfig from "@/auth.config";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter | undefined,
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session) {
        session.user.id = token.sub;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user?.role || "User";
      }
      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [...authConfig.providers],
});
