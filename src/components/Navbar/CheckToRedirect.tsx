"use client";
import { User } from "@prisma/client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

type CheckToRedirectProps = {
  role: string;
  user: User | null | undefined;
};
export default function CheckToRedirect({ role, user }: CheckToRedirectProps) {
  const router = useRouter();
  const checkRole = () => {
    if (role === "Admin") {
      router.push(`/dashboard`);
    } else {
      router.push(`/profile`);
    }
  };
  return (
    <>
      {user ? (
        <Button
          onClick={checkRole}
          className="w-full bg-blue-700 hover:bg-blue-600 hover:text-white"
        >
          Dashboard
        </Button>
      ) : (
        <Link href={"/login"}>
          <Button className="w-full bg-blue-700 hover:bg-blue-600 hover:text-white">
            Login
          </Button>
        </Link>
      )}
    </>
  );
}
