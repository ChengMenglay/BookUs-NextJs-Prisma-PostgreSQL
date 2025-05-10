"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Replace with the actual path to your shadcn button component
import { Card, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Armchair, Info } from "lucide-react";
import { format } from "date-fns";
import CustomSeatLayout from "./seat";
import { useSeatSelection } from "@/context/SeatSelectionContext";
import { toast } from "react-toastify";
import PassengerForm from "./PassengerForm";
import { User } from "@prisma/client";
import { formatter } from "@/lib/utils";
import axios from "axios";
type BooingDetailProps = {
  schedule: {
    id: string;
    bus: {
      seat: number;
      operator: {
        name: string;
        contact: string;
      };

      type: {
        type: string;
        image: string;
      };
    };
    route: {
      origin: string;
      destination: string;
      distance_km: string;
    };
    departure_date: Date | null;
    departure_time: Date;
    arrival_time: Date;
    price: number | undefined; // Update to number
    available_seat: number;
    status: string;
    recurring: boolean;
    frequency: string;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  origin: string;
  destination: string;
  users: User | null;
  bookedSeat: string[];
  busySeat: string[];
};
type Country = {
  name: {
    common: string;
  };
};
export default function BookingDetail({
  schedule,
  origin,
  destination,
  users,
  bookedSeat,
  busySeat,
}: BooingDetailProps) {
  const { selectedSeats } = useSeatSelection();
  const [seatSelection, setSeatSelection] = useState<boolean>(true);
  const [passengerForm, setPassengerForm] = useState<boolean>(false);
  const [countries, setCountries] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const subTotal = selectedSeats.length * (schedule?.price ?? 0);
  const total = subTotal;
  const handleSelectedSeat = () => {
    if (selectedSeats.length > 0) {
      setSeatSelection(false);
      setPassengerForm(true);
    } else {
      toast.info("Please select the seat at lease one!");
    }
  };
  const handleBackToSeat = () => {
    setPassengerForm(false);
    setSeatSelection(true);
  };
  useEffect(() => {
    setIsMounted(true);
    getCountryData();
  }, []);

  useEffect(() => {
    if (users) {
      getCountryData(); // Fetch data when a new user logs in
    }
  }, [users]);
  useEffect(() => {
    if (countries.length === 0) {
      getCountryData();
    }
  }, [countries]);
  const getCountryData = async () => {
    const response = await axios.get<Country[]>(
      "https://restcountries.com/v3.1/all",
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
    const countries = response.data
      .map((country) => country.name.common)
      .sort();
    setCountries(countries);
  };
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <h1 className="text-2xl ">Booking Detail</h1>
      <div className=" flex md:flex-row flex-col gap-2">
        <Card className="w-full overflow-hidden">
          <Collapsible open={seatSelection}>
            <CollapsibleTrigger asChild>
              <div className="w-full bg-[#f3eded] flex items-center justify-between p-3 border ">
                <p className="font-semibold">1. Seat Selection</p>
                <Armchair className="w-4 h-4" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4">
              <div>
                <CustomSeatLayout
                  busySeat={busySeat}
                  bookedSeat={bookedSeat}
                  totalSeat={schedule?.bus.seat as number}
                />
              </div>
              <div className="mt-6 	text-right">
                <Button
                  onClick={handleSelectedSeat}
                  className="bg-purple-500 text-white px-6 py-2"
                >
                  Next
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>
          <Collapsible open={passengerForm}>
            <CollapsibleTrigger asChild>
              <div className="w-full bg-[#f3eded] flex items-center justify-between p-3 border ">
                <p className="font-semibold">2. Passenger Details</p>
                <Info className="w-4 h-4" />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4">
              <div>
                <PassengerForm
                  currentUser={users}
                  scheduleId={schedule?.id as string}
                  handleBackToSeat={handleBackToSeat}
                  countries={countries}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        <Card className="md:w-1/2 w-full p-4">
          <CardTitle className="text-xl">Trip Summary</CardTitle>
          <div>
            <div className="h-12 border-t border-b flex justify-between gap-x-2 items-center">
              <h1>Direction: </h1>
              <p className="font-bold text-sm">
                {origin + " - " + destination}
              </p>
            </div>
            <div className="h-12 border-t border-b flex justify-between items-center">
              <h1>Departure: </h1>
              <p className="font-bold text-sm">
                {format(schedule?.departure_date as Date, "dd/MM/yyyy") +
                  " " +
                  format(schedule?.departure_date as Date, "h:mm a")}
              </p>
            </div>
            <div className="h-12 border-t border-b flex justify-between items-center">
              <h1>Operator: </h1>
              <p className="font-bold text-sm">
                {schedule?.bus.operator.name +
                  ` (+855 ${schedule?.bus.operator.contact})`}
              </p>
            </div>
            <div className="h-12 border-t border-b flex justify-between items-center">
              <h1>Type: </h1>
              <p className="font-bold text-sm">{schedule?.bus.type.type}</p>
            </div>
            <div className="h-12 border-t border-b flex justify-between items-center">
              <h1># of Passengers</h1>
              <p className="font-bold text-sm">{selectedSeats.length}</p>
            </div>
            <div className="h-12 border-t border-b flex justify-between items-center">
              <h1>Trip price</h1>
              <p className="font-bold text-sm">
                {formatter.format(schedule?.price as number)}
              </p>
            </div>
            <div className="h-12 border-t border-b flex justify-between items-center">
              <h1>Sub Total: </h1>
              <p className="font-bold text-sm">{formatter.format(subTotal)}</p>
            </div>
            <div className="h-12 border-t border-b flex justify-between items-center">
              <h1>Discount: </h1>
              <p className="font-bold text-sm">0</p>
            </div>
            <div className="h-12 border-t border-b flex justify-between items-center">
              <h1>Total: </h1>
              <p className="font-bold text-sm">{formatter.format(total)}</p>
            </div>
          </div>
        </Card>
      </div>
      <div className="flex justify-end">
        <Card className="md:w-1/3 p-4">
          <h1 className="text-lg font-bold">Note</h1>
          <ul className=" list-decimal px-4 py-2 space-y-1">
            <li className="text-sm">
              Passengers must be present at the boarding point at least 20
              minutes before the departure time.
            </li>
            <li className="text-sm">
              The seat will remove after 8 minutes if you do not process
              anything on payment.
            </li>
            <li className="text-sm">
              assengers are allowed to bring one luggage and one small cabin
              luggage. Please note that the weight of your luggage should not
              exceed 15 kg for van.
            </li>
          </ul>
        </Card>
      </div>
    </>
  );
}
