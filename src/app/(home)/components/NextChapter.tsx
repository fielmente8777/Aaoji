import {
  MainHeading,
  SectionWithContainer,
  Section,
} from "@/components";
// import { BtnIcon1, HeaderLogo2 } from "@/icons/icons";
import Image from "next/image";

interface theNextChapter {
  title: string;
  subtitle: string;
  // desc: string;
  // label: string;
  // href: string;
  images: {
    id: number,
    src: string;
    alt: string;
  }[];
}
const NextChapter: React.FC<theNextChapter> = ({
  title,
  subtitle,
  images,
}) => {
  return (
    <Section id="nextChapter" className="bg-secondary ">
      <SectionWithContainer containerClassName="relative px-4">
        <div className="flex flex-col lg:gap-6 gap-4 items-center justify-center">
          <div className="border-t-[1px] border-b-[1px] border-l-0 border-r-0 border-solid border-[#e42a03] max-w-max">
            {/* <HeaderLogo2 /> */}
            <MainHeading
              h2
              title={title}
              className="text-center artifex font-medium heading1 text-primary tracking-wider"
            />
          </div>
          <MainHeading
            h3
            title={subtitle}
            className="text-center largeHeading mendl text-primary uppercase"
          />
          <div className="flex max-md:flex-col gap-5">
            {images.map((val) => {
              return (
                <div key={val.id}>
                  <Image
                    src={val.src}
                    alt={val.alt}
                    width={600}
                    height={407}
                  />
                  <p className="text-center mt-2 font-medium text-primary text-[24px]">{val.alt}</p>
                </div>
              );
            })}
          </div>

        </div>
      </SectionWithContainer>
    </Section>
  );
};

export default NextChapter;
