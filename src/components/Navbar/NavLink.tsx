import Link from "next/link";
import React from "react";

type NavLinkProps = {
  label: string;
  href: string;
  className?: string;
};
export default function NavLink({ label, href, className }: NavLinkProps) {
  return (
    <Link className={className} href={href}>
      {label}
    </Link>
  );
}
