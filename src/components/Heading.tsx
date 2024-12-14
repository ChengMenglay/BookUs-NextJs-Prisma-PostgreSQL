import React from "react";

type HeadingProps = {
  title: string;
  subtitle: string;
};
export default function Heading({ title, subtitle }: HeadingProps) {
  return (
    <div className=" space-y-1">
      <h1 className="text-3xl font-extrabold">{title}</h1>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}
