import Link from "next/link";
import React from "react";
import NavLink from "./NavLink";
import { auth } from "@/auth";
import { getCurrentUser } from "@/app/(auth)/actions/authAction";
import UserMenu from "./UserMenu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { AlignRight } from "lucide-react";
import { Separator } from "../ui/separator";
import CheckToRedirect from "./CheckToRedirect";

const items = [
  { label: "Book Tickets", href: "/" },
  { label: "My Booking", href: "/my-booking" },
  { label: "About Us", href: "/about" },
  { label: "Contact Us", href: "/contact" },
];
export default async function Navbar() {
  const session = await auth();
  const user = session?.user && (await getCurrentUser());
  return (
    <div className="bg-white text-black fixed z-[1000] w-full shadow-lg  px-4">
      <div className="container h-16 justify-between flex items-center mx-auto">
        <Link href={"/"} className="text-3xl  font-bold">
          BookUs
        </Link>
        <div className=" md:flex hidden space-x-4  ">
          {items.map((item) => (
            <NavLink key={item.label} label={item.label} href={item.href} />
          ))}
        </div>
        <div className="md:flex hidden">
          <UserMenu name={user?.name} role={user?.role} />
        </div>
        <div className="md:hidden flex ">
          <Sheet>
            <SheetTrigger>
              <AlignRight color="black" className="w-6 h-6 " />
            </SheetTrigger>
            <SheetContent className="z-[1300]" side={"left"}>
              <SheetHeader className="my-2">
                <SheetTitle className="text-2xl font-bold text-start">
                  Book Us
                </SheetTitle>
              </SheetHeader>
              <Separator />
              <div className="flex flex-col space-y-4 my-4">
                {items.map((item) => (
                  <NavLink
                    key={item.label}
                    className="py-3 font-semibold hover:bg-blue-700 hover:text-white duration-200 px-2 rounded-md"
                    label={item.label}
                    href={item.href}
                  />
                ))}
              </div>
              <CheckToRedirect user={user} role={user?.role as string} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
