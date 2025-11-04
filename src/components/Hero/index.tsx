"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

import { toolData } from "@/content/toolData";
import type { Tool } from "@/types/tool";

// --- (ToolCard Component) ---
const ToolCard = ({ tool }: { tool: Tool }) => {
  const { title, description, href, imageLight, imageDark } = tool;
  return (
    <div className="h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:shadow-xl dark:bg-gray-800">
        <div className="relative h-52 w-full">
          {/* 2. Light mode image (hidden in darkmode) */}
          <Image
            src={imageLight}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            className="dark:hidden"
          />
          {/* 3. Dark mode image (hidden in lightmode) */}
          <Image
            src={imageDark}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            className="hidden dark:block"
          />
        </div>
        <div className="flex flex-grow flex-col p-6">
          <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
            {title}
          </h3>
          <p className="flex-grow text-base text-body-color dark:text-body-color-dark">
            {description}
          </p>
          <Link
            href={href}
            className="mt-6 inline-block w-full rounded-xs bg-primary px-6 py-3 text-center text-base font-semibold text-black duration-300 ease-in-out hover:bg-primary/90"
          >
            Open
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- (Hero Component - Baaki sab same rahega) ---
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<SwiperInstance | null>(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particleOptions: ISourceOptions = {
    // ... (Particle options) ...
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        grab: { distance: 140, links: { opacity: 1 } },
        push: { quantity: 4 },
      },
    },
    particles: {
      color: { value: "#ffffff" },
      links: {
        color: "#00ff9a",
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1.5,
        outModes: { default: "bounce" },
      },
      number: { value: 80 },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  return (
    <>
      <section
        id="home"
        className="relative z-10 flex min-h-screen flex-col justify-between overflow-hidden bg-gradient-to-tr from-gray-100 to-gray-200 pt-32 pb-16 dark:bg-gradient-to-tr dark:from-[#00072d] dark:to-[#0a1128]"
      >
        {init && (
          <Particles
            id="tsparticles"
            options={particleOptions}
            className="absolute top-0 left-0 w-full h-full z-[-1]"
          />
        )}

        <div className="flex flex-grow items-center">
          <div className="container">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              coverflowEffect={{
                rotate: 20,
                stretch: 0,
                depth: 100,
                modifier: 1.5,
                slideShadows: false,
              }}
              modules={[EffectCoverflow, Autoplay]}
              className="w-full"
              onSwiper={(swiper) => (sliderRef.current = swiper)}
              onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
            >
              {toolData.map((tool) => (
                <SwiperSlide
                  key={tool.id}
                  className="w-full max-w-[350px]"
                >
                  <ToolCard tool={tool} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="container mx-auto w-full">
          <ul className="flex justify-center space-x-3">
            {toolData.map((_, index) => (
              <li key={index}>
                <button
                  className={`h-2 w-2 rounded-full transition-all duration-30Example.jpg0 ${
                    currentSlide === index
                      ? "w-5 bg-primary"
                      : "bg-gray-400 dark:bg-gray-600"
                  }`}
                  onClick={() => sliderRef.current?.slideToLoop(index)}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* ... SVG backgrounds ... */}
      </section>
    </>
  );
};

export default Hero;