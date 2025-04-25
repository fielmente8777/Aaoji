"use client";
import Link from "next/link";
import Container from "../SectionComponents/Container";
import { NavLink, SocialLink } from "@/data/links";
import Image from "next/image";
// import { IoMdClose } from "react-icons/io";
// import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
// import MobileNav from "./MobileNav";
// import { MenuBurger, Outlinecall } from "@/icons/icons";
const Navbar: React.FC = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [isOpen]);

  return (
    <header className="max-w-[1600px] mx-auto w-full bg-secondary">
      <Container>
        <nav className="flex items-center justify-between">
          {/* <button
            className={`text-4xl lg:hidden ${isOpen ? "rotate-90" : ""} transition-all duration-300 ease-in-out`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <IoMdClose /> : <MenuBurger />}
          </button> */}
          <div className="">
            <Link
              href="#"
              className="relative h-[6rem] w-[8rem] aspect-auto block"
            >
              <Image
                src="/logo.png"
                alt="moets"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </Link>
          </div>
          <div className="lg:flex hidden items-center gap-12">
            <ul className="flex items-center gap-12">
              {NavLink.slice(1, NavLink.length).map((link) => (
                <li key={link.id} className="">
                  <Link
                    href={link.href}
                    className={`${pathname === link.href ? "border-b border-primary" : ""} capitalize text-primary avenir-book w-fit description2 hover:border-b border-primary transition-all duration-300 ease-in-out`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center">
              <ul className="flex items-center gap-6">
                {SocialLink.map((link) => (
                  <li key={link.id} className="">
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-white bg-primary border-2 border-primary w-8 h-8 aspect-square rounded-[4px] flex justify-center items-center hover:bg-white hover:text-primary transition-colors duration-300 ease-in-out"
                    >
                      <span className="sr-only">{link.label}</span>
                      {link.icon}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex lg:hidden items-center">
            <ul className="flex items-center gap-6">
              {SocialLink.map((link) => (
                <li key={link.id} className="">
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white bg-primary border-2 border-primary w-10 aspect-square rounded-[4px] flex justify-center items-center hover:bg-white hover:text-primary transition-colors duration-300 ease-in-out"
                  >
                    <span className="sr-only">{link.label}</span>
                    {link.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="lg:hidden block">
            <Link href="tel:911234567890">
              <span className="sr-only">call</span>
              <Outlinecall />
            </Link>
          </div> */}
        </nav>
      </Container>
      {/* <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} /> */}
    </header>
  );
};

export default Navbar;
