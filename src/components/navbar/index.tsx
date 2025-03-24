"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import ConnectButton from "./ConnectButton";
import ChainStatus from "./ChainStatus";
import FaucetButton from "./FaucetButton";

const NAV_LINKS = [
  {
    title: "Trade",
    href: "/",
    disabled: false,
  },
  {
    title: "Earn",
    href: "/earn",
    disabled: true,
  },
  {
    title: "Dashboard",
    href: "/dashboard",
    disabled: true,
  },
  {
    title: "Docs",
    href: "/docs",
    disabled: true,
  },
];

export default function Navbar() {
  return (
    <div className="w-full bg-[#0D0D0D]">
      <nav className="flex flex-row items-center justify-between w-full mx-auto max-w-[1440px] py-[14px] px-[24px]">
        {/* TODO: Replace with text if we can */}
        <Image src="/timelock-logo.png" alt="logo" width={180} height={20} />
        <ul className="flex flex-row items-center gap-[28px]">
          {NAV_LINKS.map(({ title, href, disabled }) => (
            <Link
              key={title}
              href={href}
              className={cn(
                "text-white text-sm font-medium",
                disabled && "text-[#A6B0C3] pointer-events-none"
              )}
            >
              {title}
            </Link>
          ))}
        </ul>
        <div
          className={cn(
            "flex flex-row items-center gap-2 w-[520px] justify-end"
          )}
        >
          <FaucetButton />
          <ChainStatus />
          <ConnectButton />
        </div>
      </nav>
    </div>
  );
}
