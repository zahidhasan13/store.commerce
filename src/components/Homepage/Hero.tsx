"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

interface Slide {
  id: number;
  imageSrc: string;
  imageAlt: string;
}

export default function HeroSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  const slides: Slide[] = [
    {
      id: 1,
      imageSrc: "/assets/images/feature-electronics.png",
      imageAlt: "Electronics Banner",
    },
    {
      id: 2,
      imageSrc: "/assets/images/feature-beauty.png",
      imageAlt: "Beauty and Fragrance Banner",
    },
    {
      id: 3,
      imageSrc: "/assets/images/feature-delivery.png",
      imageAlt: "Fast Delivery Banner",
    },
  ];

  return (
    <section className="hero-section">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hero-slider-wrapper relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            speed={700}
            grabCursor={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            className="hero-swiper"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.id}>
                <div className="hero-slide">
                  <Image
                    src={slide.imageSrc}
                    alt={slide.imageAlt}
                    fill
                    priority={index === 0}
                    quality={75}
                    sizes="100vw"
                    className="hero-image"
                    loading="eager"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Previous Button */}
          <button
            type="button"
            className="hero-arrow hero-prev"
            aria-label="Previous slide"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <ChevronLeft size={17} strokeWidth={2.5} />
          </button>

          {/* Next Button */}
          <button
            type="button"
            className="hero-arrow hero-next"
            aria-label="Next slide"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <ChevronRight size={17} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
