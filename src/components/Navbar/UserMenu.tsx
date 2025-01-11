"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
type UserMenuProps = {
  name: string | null | undefined;
  role: string | null | undefined;
};
export default function UserMenu({ role, name }: UserMenuProps) {
  const router = useRouter();
  return (
    <>
      {name ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Link href={"/profile"}>
              <User size={20} color="black" />
            </Link>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 z-[1100] space-y-3 p-4">
            <h1 className="text-lg font-bold">My Account</h1>
            <span className="text-gray-600 text-sm">
              Login as <span className="font-bold">{name}</span>
            </span>
            <Button
              className="w-full bg-blue-700 hover:bg-blue-600 hover:text-white"
              onClick={() => {
                role === "Admin"
                  ? router.push(`/dashboard`)
                  : router.push(`/profile`);
              }}
            >
              Dashboard
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant={"outline"} onClick={() => router.push("/login")}>
          Login
        </Button>
      )}
    </>
  );
}
