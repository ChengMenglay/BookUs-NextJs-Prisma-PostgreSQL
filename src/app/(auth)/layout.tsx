import Link from "next/link";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="bg-blue-700 h-16 flex items-center px-4">
        <div className=" container mx-auto">
          <Link href={"/"} className="text-3xl text-white font-bold ">
            BookUs
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
