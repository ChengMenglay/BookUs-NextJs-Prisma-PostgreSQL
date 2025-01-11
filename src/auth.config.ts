import Credential from "next-auth/providers/credentials";
import { loginSchema } from "./lib/schemas/loginSchema";
import { getUserByEmail } from "./app/(auth)/actions/authAction";
import bcrypt from "bcryptjs";
import { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Credential({
      name: "credentials",
      async authorize(creds) {
        // Validate credentials schema
        const validated = loginSchema.safeParse(creds);
        if (!validated.success) {
          console.error("Invalid credentials format:", validated.error);
          return null;
        }

        const { email, password } = validated.data;

        // Fetch user from the database
        const user = await getUserByEmail(email);
        if (!user) {
          console.error("User not found for email:", email);
          return null;
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(
          password,
          user.hashedPassword as string
        );
        if (!isPasswordValid) {
          console.error("Invalid password for user:", email);
          return null;
        }
        return user; // Return user object on successful authentication
      },
    }),
  ],
} satisfies NextAuthConfig;
