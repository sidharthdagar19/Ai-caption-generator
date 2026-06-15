"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const navItems = [
  {
    name: "Generate",
    href: "/dashboard",
  },
  {
    name: "Knowledge",
    href: "/dashboard/knowledge",
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-black text-white min-h-screen p-6 relative">
      <h1 className="text-3xl font-bold mb-10">
        Caption AI
      </h1>

      <div className="space-y-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block p-4 rounded-2xl transition ${
              pathname === item.href
                ? "bg-zinc-800"
                : "hover:bg-zinc-900"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="absolute bottom-6 left-6">
        <UserButton />
      </div>
    </div>
  );
}