"use client";
import React from "react";
import { Button } from "./ui/button";

type SearchButtonProps = {
  targetId: string;
};
export default function ScrollButton({ targetId }: SearchButtonProps) {
  const onSearchButton = () => {
    const targetButton = document.getElementById(targetId);
    if (targetButton) {
      targetButton.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Button variant={"destructive"} onClick={onSearchButton}>
      Book Now
    </Button>
  );
}
