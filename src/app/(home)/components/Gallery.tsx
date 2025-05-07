"use client";
import { GalleryDataProps } from "@/@types/types";
import { Button, MainHeading, SectionWithContainer } from "@/components";
import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { BtnIcon1, OutLineBtnNext, OutLineBtnPrev } from "@/icons/icons";
const Gallery: React.FC<GalleryDataProps> = ({
  title,
  images,
  subTitle,
  label,
  href,
}) => {
  const gridPattern = [
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-2 row-span-2",
    "col-span-2 row-span-1",
    "col-span-2 row-span-2",
    "col-span-2 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-2",
    "col-span-1 row-span-2",
    "col-span-2 row-span-2",
    
  ];

  return (
    <SectionWithContainer
      sectionId="gallery"
      sectionClassName="bg-[#DDC67B]"
    >
      <div className="flex flex-col items-center justify-center w-full lg:gap-14 gap-6 commonSwiper">
        <div className="w-full flex items-center justify-center flex-col gap-6">
        <div className="border-t-[1px] border-b-[1px] border-l-0 border-r-0 border-solid border-[#e42a03] max-w-max">
            {/* <HeaderLogo /> */}
            <MainHeading
              title={title}
              h2
              className="text-center heading1 artifex uppercase font-medium text-primary"
            />
          </div>
          <MainHeading
            title={subTitle}
            h3
            className="text-primary text-center largeHeading mendl uppercase"
          />
        </div>
        <div className="lg:grid hidden grid-cols-4 gap-6 auto-rows-[15.8rem] grid-flow-row w-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-full h-full aspect-auto relative rounded-lg overflow-hidden ${gridPattern[index]}`}
            >
              <Image
                src={image}
                alt={title + index}
                fill
                priority
                loading="eager"
                className={`object-cover ${index === 5 ? "object-top" : index === 8 ? "object-center" : index === 10 ? "object-bottom" : ""}`}
              />
            </div>
          ))}
        </div>
        <div className="w-full lg:hidden relative ">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            modules={[Pagination, Navigation]}
            navigation={{
              nextEl: ".gallery_next",
              prevEl: ".gallery_prev",
            }}
            pagination={{ clickable: true, el: ".pagination_3" }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
          >
            {images.map((image, index) => (
              <SwiperSlide
                key={index}
                className="w-full lg:aspect-[4/3] aspect-[4/3] relative rounded-lg overflow-hidden"
              >
                <Image
                  src={image}
                  alt={title + index}
                  fill
                  className="object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="gallery_prev shadow-xl absolute -left-3 top-1/2 -translate-y-1/2 filter backdrop:blur-md w-12 aspect-square rounded-full bg-white text-clr2 flex items-center justify-center disabled:opacity-0 z-10">
            <OutLineBtnPrev />
          </button>
          <button className="gallery_next shadow-xl absolute -right-3 top-1/2 -translate-y-1/2 filter backdrop:blur-md w-12 aspect-square rounded-full bg-white text-clr2 flex items-center justify-center disabled:opacity-0 z-10">
            <OutLineBtnNext />
          </button>
        </div>
        <div className="pagination_3 flex items-center justify-center gap-1 w-full lg:hidden"></div>
        <div className="flex flex-col gap-2 items-center">
          <Button href={href} label={label} newTabe className="avenir-book " />
          <BtnIcon1 />
        </div>
      </div>
    </SectionWithContainer>
  );
};

export default Gallery;
