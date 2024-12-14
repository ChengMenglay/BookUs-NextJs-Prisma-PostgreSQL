"use server";

import { ActionResult } from "@/app";
import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { userFormSchema, UserFormSchema } from "@/lib/schemas/editUserSchema";
import { LoginSchema } from "@/lib/schemas/loginSchema";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export async function SignInUser(
  data: LoginSchema
): Promise<ActionResult<string>> {
  try {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (result) {
      return { status: "success", data: "Log in successfully" };
    }
    return { status: "error", error: "Log in fail!" };
  } catch (error) {
    console.error(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", error: "Invalid Credential" };
        default:
          return { status: "error", error: "Something went wrong" };
      }
    } else {
      return { status: "error", error: "Something went wrong" };
    }
  }
}

export async function SignOutUser() {
  await signOut({
    redirectTo: "/login",
  });
}

export async function RegisterUser(
  data: RegisterSchema
): Promise<ActionResult<User>> {
  try {
    const validatedData = registerSchema.safeParse(data);
    if (!validatedData.success) {
      return { status: "error", error: validatedData.error.errors };
    }
    const { name, email, password } = validatedData.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existedEmail = await prisma.user.findUnique({ where: { email } });
    if (existedEmail) {
      return { status: "error", error: "Email provided has already existed!" };
    }
    const user = await prisma.user.create({
      data: { name, email, hashedPassword },
    });
    const signInUser = await SignInUser(data);
    if (signInUser.status === "success") {
      return { status: "success", data: user };
    } else {
      return {
        status: "error",
        error:
          "Registration successful, but login failed. Please log in manually.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      error: "Something went wrong during registration.",
    };
  }
}

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
};

export const getUserId = async () => {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) return null;
  return userId;
};

export const getCurrentUser = async () => {
  const userId = await getUserId();
  return prisma.user.findUnique({
    where: { id: userId as string },
  });
};

export async function updateUserData(
  data: UserFormSchema
): Promise<ActionResult<User>> {
  try {
    const userId = await getUserId();
    const validatedData = userFormSchema.safeParse(data);
    if (!validatedData.success)
      return { status: "error", error: validatedData.error.errors };

    const { name, email, gender, image, address, phoneNumber } =
      validatedData.data;
    const user = await prisma.user.update({
      where: { id: userId as string },
      data: { name, email, gender, image, address, phoneNumber },
    });
    return { status: "success", data: user };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      error: "Something went wrong during edit profile!",
    };
  }
}
