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

// --- (Updated ToolCard Component with Web3 Flip) ---
const ToolCard = ({ tool }: { tool: Tool }) => {
  const { title, description, href, imageLight, imageDark } = tool;
  return (
    <div className="group h-[420px] w-full perspective-1000 cursor-pointer">
      <div className="relative h-full w-full shadow-xl transition-all duration-700 transform-style-3d group-hover:rotate-y-180">

        {/* --- FRONT SIDE --- */}
        <div className="absolute inset-0 h-full w-full backface-hidden rounded-2xl overflow-hidden glass-panel neon-border">
          <div className="relative h-full w-full">
            <Image
              src={imageLight}
              alt={title}
              fill
              style={{ objectFit: "cover" }}
              className="dark:hidden opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            />
            <Image
              src={imageDark}
              alt={title}
              fill
              style={{ objectFit: "cover" }}
              className="hidden dark:block opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            />

            {/* Front Overlay with Title */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
              <h3 className="text-2xl font-bold text-white drop-shadow-md">
                {title}
              </h3>
              <div className="mt-2 h-1 w-12 rounded-full bg-primary" />
            </div>
          </div>
        </div>

        {/* --- BACK SIDE --- */}
        <div className="absolute inset-0 h-full w-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8 neon-border flex flex-col items-center justify-center text-center">
          <div className="absolute top-0 right-0 -mr-12 -mt-12 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-12 -mb-12 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />

          <h3 className="relative z-10 mb-4 text-2xl font-bold text-white">
            {title}
          </h3>
          <p className="relative z-10 mb-8 text-sm text-gray-300 leading-relaxed">
            {description}
          </p>
          <Link
            href={href}
            className="relative z-10 inline-flex items-center rounded-full bg-primary/20 border border-primary/50 px-8 py-3 text-sm font-semibold text-primary transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 shadow-[0_0_15px_rgba(0,255,154,0.3)] hover:shadow-[0_0_25px_rgba(0,255,154,0.6)]"
          >
            Access Tool
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- (Hero Component) ---
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

        <div className="flex flex-grow items-center w-full">
          <div className="container mx-auto px-4">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              loop={true}
              speed={1000}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              // We use Coverflow as a base to get 3D z-index handling right, but override transforms
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 0,
                modifier: 1,
                slideShadows: false,
              }}
              onBeforeInit={(swiper) => {
                // @ts-ignore
                swiper.params.slideShadows = false;
                // Force slides to stack so we can distribute them in a circle
                // @ts-ignore
                swiper.classNames.push('swiper-3d-ring');
                const slides = swiper.slides;
                for (let i = 0; i < slides.length; i++) {
                  slides[i].style.position = 'absolute';
                  slides[i].style.left = '50%';
                  slides[i].style.top = '0';
                  // Reset any margins
                  slides[i].style.marginLeft = `-${slides[i].offsetWidth / 2}px`;
                }
              }}
              onProgress={(swiper) => {
                const zIndexMax = swiper.slides.length;

                // Configuration for Layout (Responsive)
                // These values can be easily tweaked or made responsive
                const isMobile = window.innerWidth < 768;
                const CONFIG = {
                  CENTER_SCALE: isMobile ? 1.3 : 1.8,    // 1.8x Desktop, 1.3x Mobile
                  NEIGHBOR_OFFSET: isMobile ? 220 : 450, // 450px Desktop, 220px Mobile
                  FAR_OFFSET_STEP: isMobile ? 120 : 300,
                  DEPTH_STEP: 150,
                  ROTATION: 15,
                  VISIBILITY_THRESHOLD: 2.5
                };

                for (let i = 0; i < swiper.slides.length; i += 1) {
                  const slide = swiper.slides[i];
                  // @ts-ignore
                  const slideProgress = swiper.slides[i].progress;
                  const absProgress = Math.abs(slideProgress);

                  let xPos = 0;
                  let zPos = 0;
                  let rotate = 0;
                  let scale = 1;
                  let opacity = 1;
                  let zIndex = 0;

                  if (absProgress > 0) {
                    const sign = slideProgress > 0 ? 1 : -1;

                    // 1. Rotation: Gentle "Breathing" Curve
                    rotate = slideProgress * -CONFIG.ROTATION;

                    if (absProgress <= 1) {
                      // Transition: Center -> Neighbor
                      xPos = sign * (absProgress * CONFIG.NEIGHBOR_OFFSET);
                      zPos = -(absProgress * CONFIG.DEPTH_STEP);
                      scale = CONFIG.CENTER_SCALE - (absProgress * (CONFIG.CENTER_SCALE - 1.0));
                      opacity = 1;
                    } else {
                      // Transition: Neighbor -> Far Neighbor
                      const baseOffset = CONFIG.NEIGHBOR_OFFSET;
                      const extraOffset = (absProgress - 1) * CONFIG.FAR_OFFSET_STEP;
                      xPos = sign * (baseOffset + extraOffset);

                      zPos = -(CONFIG.DEPTH_STEP + (absProgress - 1) * CONFIG.DEPTH_STEP);

                      scale = 1.0 - ((absProgress - 1) * 0.2);
                      opacity = 1.0 - ((absProgress - 1) * 0.4);
                    }
                  } else {
                    // Exact Center
                    scale = CONFIG.CENTER_SCALE;
                    zIndex = zIndexMax + 10;
                  }

                  // Apply styles
                  slide.style.transform = `translateX(-50%) translate3d(${xPos}px, 0, ${zPos}px) rotateY(${rotate}deg) scale(${scale})`;

                  // Z-Index Handling
                  if (absProgress > 0) {
                    let calculatedZ = zIndexMax - Math.abs(Math.round(slideProgress));
                    slide.style.zIndex = String(calculatedZ);
                  } else {
                    slide.style.zIndex = String(zIndex);
                  }

                  // Visibility Handling
                  if (absProgress > CONFIG.VISIBILITY_THRESHOLD) {
                    slide.style.opacity = "0";
                    slide.style.pointerEvents = "none";
                  } else {
                    slide.style.opacity = String(opacity);
                    slide.style.pointerEvents = "auto";
                  }
                }
              }}
              onSetTransition={(swiper, duration) => {
                for (let i = 0; i < swiper.slides.length; i += 1) {
                  swiper.slides[i].style.transitionDuration = `${duration}ms`;
                }
              }}
              modules={[EffectCoverflow, Autoplay]}
              className="w-full !overflow-visible py-20 perspective-1000"
              onSwiper={(swiper) => (sliderRef.current = swiper)}
              onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
            >
              {toolData.map((tool) => (
                <SwiperSlide
                  key={tool.id}
                  className="w-full max-w-[350px] transition-transform duration-300 transform hover:scale-105 z-10"
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
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${currentSlide === index
                    ? "w-5 bg-primary"
                    : "bg-gray-400 dark:bg-gray-600"
                    }`}
                  onClick={() => sliderRef.current?.slideToLoop(index)}
                />
              </li>
            ))}
          </ul>
        </div>

      </section>
    </>
  );
};

export default Hero;