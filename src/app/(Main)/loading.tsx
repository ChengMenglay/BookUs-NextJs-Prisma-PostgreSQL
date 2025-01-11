import React from "react";
import { CgSpinnerTwoAlt } from "react-icons/cg";

export default function Loading() {
  return (
    <div className=" h-screen flex items-center justify-center">
      <CgSpinnerTwoAlt className="animate-spin w-10 h-10" />
    </div>
  );
}
