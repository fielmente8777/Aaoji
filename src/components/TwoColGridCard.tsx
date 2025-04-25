import Image from "next/image";
import Paragraph from "./Paragraph/Paragraph";
import { AboutUsDataProps } from "@/@types/types";
import Link from "next/link";
import { BtnIcon1 } from "@/icons/icons";

const TwoColGridCard: React.FC<AboutUsDataProps> = ({
  title,
  subtitle,
  desc,
  image,
  buttons,
  boldDesc
}) => {
  return (
    <>
      <div className={`lg:grid grid-cols-2 lg:items-center gap-6 lg:gap-24`}>
        <div className={`col-span-1 w-full lg:block hidden`}>
          <div className="relative w-full aspect-[4/5.6]">
            <Image src={image} alt="alt" fill className={"object-cover"} />
          </div>
        </div>
        <div className={` flex flex-col gap-4 col-span-1  `}>
          {title && (
            <div className="flex flex-col gap-2 max-sm:items-center w-full">
              <div className="border-t-[1px] border-b-[1px] border-l-0 border-r-0 border-solid border-[#e42a03] max-w-max">
                {/* <HeaderLogo3 /> */}
                <h2 className="capitalize tracking-wide artifex text-primary font-medium heading1">
                  {title}
                </h2>
              </div>
              <h3 className="uppercase max-sm:text-center mendl text-primary largeHeading font-semibold">
                {subtitle}
              </h3>
            </div>
          )}
          <div className="relative w-full aspect-[4/5.9] lg:hidden">
            <Image src={image} alt="alt" fill className={"object-cover"} />
          </div>
          {desc && (
            <Paragraph
              text={desc}
              className="description1 max-sm:text-center text-[#534E4D]"
            />
          )}
          {boldDesc && (
            <Paragraph
              text={boldDesc}
              className="description1 max-sm:text-center text-[#534E4D]"
            />
          )}
          <div className="flex max-sm:flex-col-reverse max-sm:items-center lg:gap-5  lg:mt-4">
            <div className="flex flex-col gap-2 items-center">
              <Link
                href={buttons[0].href}
                className="text-white bg-primary text-base capitalize py-3 px-6 description2 avenir-book rounded-full font-medium  transition-all duration-300 ease-in-out hover:scale-[1.01] active:scale-100"
              >
                {buttons[0].label}
              </Link>
              <BtnIcon1/>
            </div>
            <Link
              href={buttons[1].href}
              className=" text-primary underline underline-offset-1 avenir-book text-base capitalize py-3 px-6 description2 rounded-full font-medium  transition-all duration-300 ease-in-out active:scale-100"
            >
              {buttons[1].label}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TwoColGridCard;
