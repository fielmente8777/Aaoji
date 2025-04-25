import Image from "next/image";
import MainHeading from "../Heading/MainHeading";
import { testimonialProps } from "@/@types/types";
import Paragraph from "../Paragraph/Paragraph";

const TestimonialCard: React.FC<testimonialProps["cards"][0]> = ({
  user,
  desc,
  src,
}) => {
  return (
    <div className="w-full flex flex-col gap-6 border border-primary rounded-lg py-8 px-6 shadow-md h-[328px] bg-white">
      <div className="relative w-10 aspect-square">
        <Image
          src={src}
          alt="Image 1"
          className="object-cover object-top"
          sizes="100vw"
          fill
        />
      </div>
      <Paragraph className="description1 avenir font-light" text={desc} />
      <MainHeading
        h4
        className="font-bold lg:text-lg text-base montserrat text-[#363636]"
        title={user}
      />
    </div>
  );
};

export default TestimonialCard;
