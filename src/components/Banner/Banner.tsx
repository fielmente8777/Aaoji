// import Image from "next/image";
import Paragraph from "../Paragraph/Paragraph";
import Link from "next/link";
import Image from "next/image";
import { BtnIcon1 } from "@/icons/icons";

interface BannerProps {
  title: string;
  subTitle: string;
  src: string;
  desc: string;
  buttons: {
    label: string;
    href: string;
  }[];
}
const Banner: React.FC<BannerProps> = ({
  title,
  desc,
  src,
  buttons,
  subTitle,
}) => {
  return (
    <section className="max-w-[1600px] mx-auto w-full text-primary pb-10 lg:pt-[40px] pt-6 relative">
      <div className="grid lg:grid-cols-7 items-center gap-5 lg:gap-10 justify-center grid-cols-1 relative z-10">
        <div className="w-full lg:col-span-3 max-md:pt-4">
          <div className="flex flex-col lg:gap-4 gap-1 w-full ml-auto max-w-lg max-sm:px-4 max-sm:items-center">
            <div className="border-t-[1px] border-b-[1px] border-l-0 border-r-0 border-solid border-[#e42a03] max-w-max">
              <h1 className="heading1 artifex capitalize font-medium max-sm:text-center">
                {subTitle}
              </h1>
            </div>
            <h2 className="largeHeading uppercase mendl font-bold max-sm:text-center">
              {title}
            </h2>
            <div className="lg:hidden block relative w-full aspect-[4/2.9]">
              <Image src={src} alt="alt" fill className={"object-contain"} />
            </div>
            <Paragraph
              className={
                "mt-4 description1 avenir max-sm:text-center font-light"
              }
              text={desc}
            />
            <div className="flex max-sm:flex-col-reverse max-sm:items-center lg:gap-5 gap-4 mt-4">
              <div className="flex flex-col gap-2 items-center">
                <Link
                  href={buttons[0].href}
                  className="text-primary bg-white avenir-book text-base capitalize py-3 px-6 description2 rounded-full  transition-all duration-300 ease-in-out hover:scale-[1.01] active:scale-100"
                >
                  {buttons[0].label}
                </Link>
                <BtnIcon1 />
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
        <div className="lg:col-span-4 w-full py-4 ps-8 relative lg:block hidden lg:-mr-8">
          <div className="relative w-full max-w-4xl aspect-[4/2.5]">
            <Image src={src} alt="alt" height={712} width={600} className="object-cover " />
          </div>
        </div>
      </div>
      <div className="w-full absolute inset-0 lg:!mb-[80px] bg-secondary lg:rounded-bl-[13rem] rounded-bl-[8rem]"></div>
    </section>
  );
};

export default Banner;
