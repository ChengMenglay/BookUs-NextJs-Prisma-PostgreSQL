import { Card } from "@/components/ui/card";
import { BadgeDollarSign, Ticket, UsersRound } from "lucide-react";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import React from "react";
import DashboardNav from "@/components/DashboardNav";

export default function Dashboard() {
  return (
    <>
      <DashboardNav title="Overview" />
      <div className="space-y-2 py-4 px-4">
        <Card className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2 ">
          <Card className="w-full bg-muted/50 rounded-lg  aspect-video h-[100px] flex items-center">
            <div className="flex px-2 space-x-6">
              <div className="w-[60px] h-[60px] rounded-md flex justify-center items-center bg-[rgba(233,233,233)]">
                <BadgeDollarSign size={25} />
              </div>
              <div>
                <h1 className="text-xs font-semibold text-[#6F6F6F]">
                  Total Revenue
                </h1>
                <span className="text-xl font-bold">20</span>
              </div>
            </div>
          </Card>
          <Card className="w-full bg-muted/50 rounded-lg  aspect-video h-[100px] flex items-center">
            <div className="flex px-2 space-x-6">
              <div className="w-[60px] h-[60px] rounded-md flex justify-center items-center bg-[rgba(233,233,233)]">
                <FaMoneyBillTrendUp size={25} />
              </div>
              <div>
                <h1 className="text-xs font-semibold text-[#6F6F6F]">
                  Total Profit
                </h1>
                <span className="text-xl font-bold ">30</span>
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
                  Ticket Sell
                </h1>
                <span className="text-xl font-bold ">299</span>
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
                <span className="text-xl font-bold">$ 299</span>
              </div>
            </div>
          </Card>
        </Card>
        <Card className="grid grid-cols-1 rounded-lg"></Card>
      </div>
    </>
  );
}
