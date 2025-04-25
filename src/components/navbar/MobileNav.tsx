"use client";
import { NavLink } from "@/data/links";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
const MobileNav: React.FC<MobileNavProps> = ({ isOpen, setIsOpen }) => {
  const pathName = usePathname();
  return (
    <header
      className={`fixed top-20 w-5/6 h-screen bg-white/90 z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <nav>
        <ul className="flex flex-col gap-4 p-8">
          {NavLink.map((link) => (
            <li key={link.id} className="w-full">
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`w-full block text-secondary hover:text-tertiary capitalize text-lg transition-all duration-300 ease-in-out ${link.href === pathName ? "text-tertiary" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default MobileNav;
