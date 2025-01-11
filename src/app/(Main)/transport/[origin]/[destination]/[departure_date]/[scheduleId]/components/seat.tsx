"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSeatSelection } from "@/context/SeatSelectionContext";
import React from "react";

type CustomSeatLayoutProps = {
  totalSeat: number;
  bookedSeat: string[];
  busySeat: string[];
};
export default function CustomSeatLayout({
  totalSeat,
  bookedSeat,
  busySeat,
}: CustomSeatLayoutProps) {
  const { selectedSeats, setSelectedSeats } = useSeatSelection();
  let left: number[] = [];
  let right: number[] = [];
  if (totalSeat === 48) {
    let haft_Seats = totalSeat / 2;
    for (let i = 1; i <= haft_Seats; i++) {
      right.push(i);
    }
    for (let i = haft_Seats + 1; i <= totalSeat; i++) {
      left.push(i);
    }
  } else {
    let haft_Seats = 24;
    for (let i = 1; i <= haft_Seats; i++) {
      right.push(i);
    }
    for (let i = haft_Seats + 1; i <= totalSeat; i++) {
      left.push(i);
    }
  }
  const isSelected = (seat: number): boolean => selectedSeats.includes(seat);
  const handleSeatClick = (seat: number) => {
    if (isBooked(seat)) return;
    setSelectedSeats((prev: number[]) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };
  const isBusy = (seat: number): boolean => busySeat.includes(seat.toString());
  const isBooked = (seat: number): boolean =>
    bookedSeat.includes(seat.toString());
  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <div>
          <h1 className="text-lg font-semibold mb-4">
            Please Select Your Seat
          </h1>
          <div className="flex space-x-2">
            <div>
              <h1 className="text-sm">Available</h1>
              <div className="w-full border py-1 bg-gray-500"></div>
            </div>
            <div>
              <h1 className="text-sm">Busy</h1>
              <div className="w-full border py-1 bg-red-600"></div>
            </div>
            <div>
              <h1 className="text-sm">Selected</h1>
              <div className="w-full border py-1 bg-green-500"></div>
            </div>
            <div>
              <h1 className="text-sm">Booked</h1>
              <div className="w-full border py-1 bg-red-800"></div>
            </div>
          </div>
        </div>
        <div>
          <h1>Total Selected:</h1>
          <Input
            className="bg-[#f6f0f0]"
            disabled={true}
            value={selectedSeats ? selectedSeats.length : 0}
          />
          <h1>Selected Seat:</h1>
          <Input
            className="bg-[#f6f0f0]"
            disabled={true}
            value={selectedSeats.map((seat) => seat).join(", ")}
          />
        </div>
      </div>
      {/* Right Seats */}
      <div className=" space-y-2 space-x-1">
        <h2 className="font-bold">Right</h2>
        {right.map((seat) => (
          <Button
            key={seat}
            className={`w-12 h-12 ${
              isBooked(seat)
                ? "bg-red-800 text-white cursor-not-allowed"
                : isBusy(seat)
                ? "bg-red-600 text-white cursor-not-allowed"
                : isSelected(seat)
                ? "bg-green-500 text-white"
                : "bg-gray-500"
            }
             `}
            onClick={
              isBooked(seat) || isBusy(seat)
                ? undefined
                : () => handleSeatClick(seat)
            }
          >
            {seat}
          </Button>
        ))}
      </div>
      {/* Left Seats */}
      <div>
        <div className="space-y-2 space-x-1">
          <h2 className="font-bold">Left</h2>
          {left.map((seat) => (
            <Button
              key={seat}
              className={`w-12 h-12 ${
                isBooked(seat)
                  ? "bg-red-800 text-white cursor-not-allowed"
                  : isBusy(seat)
                  ? "bg-red-600 text-white cursor-not-allowed"
                  : isSelected(seat)
                  ? "bg-green-500 text-white"
                  : "bg-gray-500"
              }`}
              onClick={
                isBooked(seat) || isBusy(seat)
                  ? undefined
                  : () => handleSeatClick(seat)
              }
            >
              {seat}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
