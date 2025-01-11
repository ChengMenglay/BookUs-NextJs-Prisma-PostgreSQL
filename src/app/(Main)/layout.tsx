import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Separator } from "@/components/ui/separator";
import SeatSelectionProvider from "@/context/SeatSelectionContext";
import React, { ReactNode } from "react";

export default function LayoutPage({ children }: { children: ReactNode }) {
  return (
    <main>
      <Navbar />
      <SeatSelectionProvider>{children}</SeatSelectionProvider>
      <div className="mt-10">
        <Separator />
        <Footer />
      </div>
    </main>
  );
}
