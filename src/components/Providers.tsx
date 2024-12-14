import React, { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <div>
      <ToastContainer
        position="top-center"
        hideProgressBar
        className={"z-50"}
      />{" "}
      {children}
    </div>
  );
}
