"use client";
import { Card } from "@/components/ui/card";
import {
  BadgeDollarSign,
  Ticket,
  UserRoundCog,
  UsersRound,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { formatter } from "@/lib/utils";

type OverviewProps = {
  users: User[] | null;
  admins: User[] | null;
  tickets: {
    totalPrice: number;
    id: string;
    seatNumber: string[];
    schedule: {
      price: number;
    };
  }[];
};
export default function Overview({ users, admins, tickets }: OverviewProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  let total_ticket: number = 0;
  let total_revenue: number = 0;
  tickets.forEach((ticket) => {
    total_revenue += ticket?.totalPrice;
    total_ticket += ticket.seatNumber.length;
  });
  return (
    <>
      <div className="space-y-2 py-4 px-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 ">
          <Card className="w-full bg-muted/50 rounded-lg  aspect-video h-[100px] flex items-center">
            <div className="flex px-2 space-x-6">
              <div className="w-[60px] h-[60px] rounded-md flex justify-center items-center bg-[rgba(233,233,233)]">
                <BadgeDollarSign size={25} />
              </div>
              <div>
                <h1 className="text-xs font-semibold text-[#6F6F6F]">
                  Total Revenue
                </h1>
                <span className="text-xl font-bold">
                  {formatter.format(total_revenue)}
                </span>
              </div>
            </div>
          </Card>
          <Card className="w-full bg-muted/50 rounded-lg  aspect-video h-[100px] flex items-center">
            <div className="flex px-2 space-x-6">
              <div className="w-[60px] h-[60px] rounded-md flex justify-center items-center bg-[rgba(233,233,233)]">
                <Ticket size={25} />
              </div>
              <div>
                <h1 className="text-xs font-semibold text-[#6F6F6F]">
                  Ticket Sold
                </h1>
                <span className="text-xl font-bold ">{total_ticket}</span>
              </div>
            </div>
          </Card>
          <Card className="w-full bg-muted/50 rounded-lg  aspect-video h-[100px] flex items-center">
            <div className="flex px-2 space-x-6">
              <div className="w-[60px] h-[60px] rounded-md flex justify-center items-center bg-[rgba(233,233,233)]">
                <UserRoundCog size={25} />
              </div>
              <div>
                <h1 className="text-xs font-semibold text-[#6F6F6F]">
                  Total Admin
                </h1>
                <span className="text-xl font-bold ">{admins?.length}</span>
              </div>
            </div>
          </Card>
          <Card className="w-full bg-muted/50 rounded-lg  aspect-video h-[100px] flex items-center">
            <div className="flex px-2 space-x-6">
              <div className="w-[60px] h-[60px] rounded-md flex justify-center items-center bg-[rgba(233,233,233)]">
                <UsersRound size={25} />
              </div>
              <div>
                <h1 className="text-xs font-semibold text-[#6F6F6F]">
                  Total Customer
                </h1>
                <span className="text-xl font-bold">{users?.length}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
