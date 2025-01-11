"use client";
import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { Route } from "@prisma/client";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

type PopularPlaceProps = {
  route: Route | null;
};
export default function PopularPlace({ route }: PopularPlaceProps) {
  const router = useRouter();
  const now = format(new Date(), "dd-MM-yyyy");
  return (
    <Card className="h-[350px] overflow-hidden">
      <div className="relative w-full h-2/3">
        <Image
          alt={route?.type as string}
          src={route?.image_url as string}
          fill
          className="object-cover"
        />
      </div>
      <div className="px-4 py-2 space-y-2">
        <p className="font-semibold">
          {route?.origin + " - " + route?.destination}
        </p>
        <Button
          onClick={() =>
            router.push(
              `/transport/${route?.origin
                .split(" ")
                .join("-")}/${route?.destination.split(" ").join("-")}/${now}`
            )
          }
          className="bg-blue-700 text-white"
        >
          Book Now
        </Button>
      </div>
    </Card>
  );
}
