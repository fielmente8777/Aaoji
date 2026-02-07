"use client";
import { FooterLink, SocialLink } from "@/data/links";
import SectionWithContainer from "./SectionComponents/SectionWithContainer";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const currentYear = new Date().getFullYear();
const pathName = usePathname();
  if (pathName === "/thank-you" || pathName === "/thank-you/") {
    return null;
  }
  return (
    <footer className="max-screen w-full bg-secondary bg_top_image">
      <SectionWithContainer sectionClassName="">
        <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 lg:gap-20">
          <div className="w-full flex flex-col lg:gap-4 gap-2 max-sm:items-center">
            <div className="relative aspect-[4/3] w-[10rem]" style={{marginTop:"-20px"}}>
              <Image
                src={"/logo.png"}
                alt="Aaoji"
                fill
                className="object-contain"
              />
            </div>
            <p className=" avenir text-dark description1">
            Bold Flavors, Fun Vibes, Authentic Taste
            </p>
            <ul className="flex items-center max-sm:justify-center w-full gap-4 mt-4">
              {SocialLink.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="bg-primary text-white w-8 flex items-center justify-center aspect-square rounded-[0.25rem] hover:text-primary hover:bg-white border border-primary transition-all duration-300 ease-in-out hover:shadow-sm hover:scale-105"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.icon}
                    <span className="sr-only">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {FooterLink.map((link, i) => (
            <div key={i} className="w-full flex flex-col gap-4">
              <h2 className="heading1 uppercase text-primary mendl">
                {link.title}
              </h2>
              <ul className="flex flex-col gap-2">
                {link.id === 3 ? (
                  <>
                    {link.links.map((item, i) => (
                      <li key={i} className="description2 avenir text-dark">
                        {item.label} {item.href}
                      </li>
                    ))}
                  </>
                ) : (
                  <>
                    {link.links.map((item, i) => (
                      <li key={i}>
                        <Link href={item.href} className="description2 avenir text-dark hover:underline">
                          {item.label}
                        </Link>
                        {item.href2 && <>, </>}

                        {item.href2 && (
                          <Link
                            href={item.href2}
                            className="description2 avenir text-dark"
                          >
                            {item.label2}
                          </Link>
                        )}
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
          ))}
        </div>
      </SectionWithContainer>
      <SectionWithContainer sectionClassName="bg-[#570000] border-t border-primary !py-4 text-white">
        <div className="flex max-md:flex-col items-center lg:justify-center gap-4">
          <p className="text-center avenir">
            © {currentYear} Aaoji. <br className="lg:hidden" />
            All Rights Reserved. <br className="lg:hidden" />
            Designed & Developed by{" "}
            {/* <Link href="https://eazotel.com" className="font-bold">
              Eazotel
            </Link> */}
             <Link
                href="https://www.fielmente.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fielmente
              </Link>
          </p>
          {/* <p className="">Terms of Service Privacy Policy</p> */}
        </div>
      </SectionWithContainer>
    </footer>
  );
};

export default Footer;
