"use client";
import { upcomingEventsProps } from "@/@types/types";
import { Button, MainHeading, Section } from "@/components";
import SliderSwip from "@/components/SliderSwip";
import { Navigation, Pagination } from "swiper/modules";

const UpcomingEvents: React.FC<upcomingEventsProps> = ({
  title,
  subTitle,
  label,
  href,
}) => {
  return (
    <Section>
      <div className="w-full flex items-center justify-center flex-col gap-6">
        <MainHeading
          title={title}
          h2
          className="text-center heading1 artifex uppercase font-medium"
        />
        <MainHeading
          title={subTitle}
          h3
          className="text-primary text-center largeHeading mendl uppercase"
        />
        <div className="w-full mt-4 commonSwiper">
          <SliderSwip
            data={[1, 2, 3, 4, 5, 6]}
            loop={true}
            modules={[Navigation, Pagination]}
            // navigation={true}
            pagination={{
              clickable: true,
              el: ".pagination_4",
            }}
            centeredSlides={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 2.2,
                spaceBetween: 20,
              },
            }}
          >
            {() => (
              <div className="w-full h-[300px] border-primary border bg-secondary shadow-md rounded-sm"></div>
            )}
          </SliderSwip>
          <div className="pagination_4 flex items-center justify-center gap-1 mt-4 lg:mt-8"></div>
          <div className="w-full flex items-center justify-center mt-4 lg:mt-8">
            <Button href={href} label={label} newTabe className="avenir" />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default UpcomingEvents;
