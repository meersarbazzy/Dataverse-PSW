// "use client"
"use client";

import Link from "next/link";
import Image from "next/image";
// React hooks
import React, { useEffect, useState, useRef } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { EffectCoverflow, Autoplay } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/effect-coverflow";

// --- (Tool Type aur Data) ---
type Tool = {
  id: number;
  title: string;
  description: string;
  href: string;
  image: string;
};

const toolData: Tool[] = [
  {
    id: 1,
    title: "SQL Solution Recommender",
    description: "Get intelligent recommendations for complex SQL queries...",
    href: process.env.NEXT_PUBLIC_URL_SQL_RECOMMENDER || "#",
    image: "/images/logo/logo_TBA.png",
  },
  {
    id: 2,
    title: "Validata",
    description: "Our primary data validation tool...",
    href: process.env.NEXT_PUBLIC_URL_VALIDATA || "#",
    image: "/images/logo/logo_TBA.png",
  },
  {
    id: 3,
    title: "Data Quality & Error Logging Form",
    description: "Easily report data issues...",
    href: process.env.NEXT_PUBLIC_URL_DATA_QUALITY_FORM || "#",
    image: "/images/logo/logo_TBA.png",
  },
  {
    id: 4,
    title: "Data Definitions",
    description: "A clear, concise dictionary...",
    href: process.env.NEXT_PUBLIC_URL_DATA_DEFINITIONS || "#",
    image: "/images/logo/logo_TBA.png",
  },
  {
    id: 5,
    title: "Data Glossary",
    description: "The central business glossary...",
    href: process.env.NEXT_PUBLIC_URL_DATA_GLOSSARY || "#",
    image: "/images/logo/logo_TBA.png",
  },
  {
    id: 6,
    title: "SOP Documents",
    description: "Standard Operating Procedures...",
    href: process.env.NEXT_PUBLIC_URL_SOP_DOCS || "#",
    image: "/images/logo/logo_TBA.png",
  },
  {
    id: 7,
    title: "GitRepo",
    description: "Browse our code repositories...",
    href: process.env.NEXT_PUBLIC_URL_GITREPO || "#",
    image: "/images/logo/logo_TBA.png",
  },
];

// --- (ToolCard Component - No Change) ---
const ToolCard = ({ tool }: { tool: Tool }) => {
  const { title, description, href, image } = tool;
  return (
    <div className="h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:shadow-xl dark:bg-gray-800">
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
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

// --- (Main Page Component - Hero) ---
const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<SwiperInstance | null>(null);

  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  // Particle Options
  const particleOptions: ISourceOptions = {
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
        {/* Particle Background*/}
        {init && (
          <Particles
            id="tsparticles"
            options={particleOptions}
            className="absolute top-0 left-0 w-full h-full z-[-1]"
          />
        )}

        {/* Carousel Wrapper*/}
        <div className="flex flex-grow items-center">
          <div className="container">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              modules={[EffectCoverflow, Autoplay]} 
              className="w-full" 
              onSwiper={(swiper) => {
                sliderRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setCurrentSlide(swiper.realIndex);
              }}
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

        {/* Custom Dots Wrapper*/}
        <div className="container mx-auto w-full">
          <ul className="flex justify-center space-x-3">
            {toolData.map((_, index) => (
              <li key={index}>
                <button
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
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

        {/* SVG Backgrounds*/}
        <div className="absolute right-0 top-0 z-[-1] opacity-30 lg:opacity-100">
          <svg /* ... */>{/* ... (svg code) ... */}</svg>
        </div>
        <div className="absolute bottom-0 left-0 z-[-1] opacity-30 lg:opacity-100">
          <svg /* ... */>{/* ... (svg code) ... */}</svg>
        </div>
      </section>
    </>
  );
};

// Export as default page
export default Hero;