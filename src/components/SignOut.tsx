"use client";
import React from "react";
import { LogOut } from "lucide-react";
import { SignOutUser } from "@/app/(auth)/actions/authAction";
type SignOutProps = {
  size?: string;
  className?: string;
  name?: string;
};
export default function SignOut({ size, className = "", name }: SignOutProps) {
  return (
    <div
      className={"flex items-center space-x-1" + className}
      onClick={async () => await SignOutUser()}
    >
      <LogOut size={size} />
      <span>{name}</span>
    </div>
  );
}
