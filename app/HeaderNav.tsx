"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import UserIcon from "./UserIcon";

const navMenu = [
  {
    section: "Main",
    items: [
      { name: "Beginning", href: "/beginning" },
      { name: "Product Exchange", href: "/product-exchange" },
      { name: "Store", href: "/store" },
    ],
  },
  {
    section: "Inventory",
    items: [
      { name: "Products", href: "/products" },
      { name: "Batches", href: "/batches" },
      { name: "Suppliers", href: "/suppliers" },
      { name: "Categories", href: "/categories" },
    ],
  },
  {
    section: "Other",
    items: [
      { name: "Notifications", href: "/notifications" },
      { name: "Reports", href: "/reports" },
    ],
  },
];

export default function HeaderNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="w-full bg-white dark:bg-zinc-900 shadow-md sticky top-0 z-50">
      <nav className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 dark:text-blue-400 px-4 whitespace-nowrap"
          >
            Inventory Tracker
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-6">
            {navMenu.map((section, idx) => (
              <div
                key={section.section}
                className="flex items-center space-x-6"
              >
                {idx > 0 && (
                  <span className="mx-2 text-gray-300 dark:text-gray-600">
                    |
                  </span>
                )}
                {section.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={
                      `font-medium px-4 whitespace-nowrap transition-colors  py-1 border-b-2 ` +
                      (pathname && pathname.startsWith(item.href)
                        ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                        : "border-transparent text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400")
                    }
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div className="ml-4 flex items-center">
            <button
              className="rounded-full p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="User menu"
            >
              <UserIcon className="w-8 h-8 text-gray-500 dark:text-gray-300" />
            </button>
          </div>
        </div>
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            className="p-2 rounded bg-zinc-100 dark:bg-zinc-800"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Open navigation menu"
          >
            <svg
              className="w-6 h-6 text-gray-700 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>
      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-900 shadow-lg px-4 py-2">
          {navMenu.map((section, idx) => (
            <div key={section.section} className="mb-2">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                {section.section}
              </div>
              <div className="flex flex-col">
                {section.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={
                      `font-medium transition-colors px-2 py-1 border-b-2 ` +
                      (pathname && pathname.startsWith(item.href)
                        ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                        : "border-transparent text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400")
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              {idx < navMenu.length - 1 && (
                <hr className="my-2 border-gray-200 dark:border-gray-700" />
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
