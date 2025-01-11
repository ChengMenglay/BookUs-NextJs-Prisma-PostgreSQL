"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

type SeatSelectionContextType = {
  selectedSeats: number[];
  setSelectedSeats: (seats: number[] | ((prev: number[]) => number[])) => void;
};
const SeatSelectionContext = createContext<SeatSelectionContextType | null>(
  null
);
export default function SeatSelectionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  return (
    <SeatSelectionContext.Provider value={{ selectedSeats, setSelectedSeats }}>
      {children}
    </SeatSelectionContext.Provider>
  );
}
export const useSeatSelection = () => {
  const context = useContext(SeatSelectionContext);
  if (!context) {
    throw new Error(
      "useSeatSelection mush be used within a SeatSelectionProvider"
    );
  }
  return context;
};
