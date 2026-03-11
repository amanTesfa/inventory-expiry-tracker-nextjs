
'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserIcon from "./UserIcon";

const navItems = [
  { name: "Products", href: "/products" },
  { name: "Batches", href: "/batches" },
  { name: "Suppliers", href: "/suppliers" },
  { name: "Notifications", href: "/notifications" },
  { name: "Reports", href: "/reports" },
];

export default function HeaderNav() {
  const pathname = usePathname();
  return (
    <header className="w-full bg-white dark:bg-zinc-900 shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">Inventory Tracker</Link>
        </div>
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={
                  `font-medium transition-colors px-2 py-1 border-b-2 ` +
                  (pathname && pathname.startsWith(item.href)
                    ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                    : "border-transparent text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-400")
                }
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="ml-4 flex items-center">
            <button className="rounded-full p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" aria-label="User menu">
              <UserIcon className="w-8 h-8 text-gray-500 dark:text-gray-300" />
            </button>
          </div>
        </div>
        <div className="md:hidden">
          {/* Mobile menu button placeholder */}
        </div>
      </nav>
    </header>
  );
}
