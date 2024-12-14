import Link from "next/link";
import React from "react";
import UserForm from "./UserForm";
import { getCurrentUser } from "@/app/(auth)/actions/authAction";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  const provinces = await prisma.province.findMany();
  return (
    <div>
      <div className="flex items-center space-x-6">
        <div className="bg-[#F5F5F5] w-48 h-16 flex justify-center items-center">
          <Link href={"/"} className="text-2xl font-bold">
            BookUs
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-blue-700">Your Profile</h1>
      </div>
      <div className="min-h-[93vh] w-full py-8 px-2 bg-[#F5F5F5]">
        <div className="container mx-auto px-2">
          <UserForm users={user} provinces={provinces} />
        </div>
      </div>
    </div>
  );
}
