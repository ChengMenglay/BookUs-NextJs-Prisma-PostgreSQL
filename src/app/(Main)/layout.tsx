import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import React, { ReactNode } from "react";

export default function LayoutPage({ children }: { children: ReactNode }) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
