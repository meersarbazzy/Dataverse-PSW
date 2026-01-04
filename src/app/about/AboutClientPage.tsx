"use client";

import React, { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

// --- ToolListItem Component ---
const ToolListItem = ({ text }: { text: string }) => (
  <li className="flex items-center space-x-3">
    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-black">
      {/* Checkmark Icon */}
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        ></path>
      </svg>
    </span>
    <span className="text-body-color dark:text-body-color-dark">{text}</span>
  </li>
);

// --- Breadcrumb Component (With Particles) ---
const Breadcrumb = ({
  pageName,
  description,
  init,
  options,
}: {
  pageName: string;
  description: string;
  init: boolean;
  options: ISourceOptions;
}) => {
  return (
    <section className="relative z-10 overflow-hidden bg-gradient-to-tr from-gray-100 to-gray-200 pt-32 pb-16 dark:bg-gradient-to-tr dark:from-[#00072d] dark:to-[#0a1128] md:pt-40 md:pb-20">
      {/* Particle component */}
      {init && (
        <Particles
          id="tsparticles-breadcrumb"
          options={options}
          className="absolute top-0 left-0 w-full h-full z-[-1]"
        />
      )}

      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto max-w-[800px] text-center">
              <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                {pageName}
              </h1>
              <p className="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- About Section One (Simple, No Particles) ---
const AboutSectionOne = () => {
  return (
    <section className="relative z-20 bg-white py-16 dark:bg-black md:py-20 lg:py-28">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-black dark:text-white sm:text-4xl">
            What is the Dataverse?
          </h2>
          <p className="text-lg text-body-color dark:text-body-color-dark sm:text-xl">
            The Dataverse is our centralized web page where all of our essential
            data tools and resources are made available to the team. It&apos;s the
            single source of truth for data operations, streamlining our
            workflows and enhancing productivity.
          </p>
        </div>
      </div>
    </section>
  );
};

// --- About Section Two (With Particles) ---
const AboutSectionTwo = ({
  init,
  options,
}: {
  init: boolean;
  options: ISourceOptions;
}) => {
  return (
    <section className="relative z-10 bg-gradient-to-tr from-gray-100 to-gray-200 py-16 dark:bg-gradient-to-tr dark:from-[#00072d] dark:to-[#0a1128] md:py-20 lg:py-28">
      {/* Particle component */}
      {init && (
        <Particles
          id="tsparticles-about-2"
          options={options}
          className="absolute top-0 left-0 w-full h-full z-[-1]"
        />
      )}

      <div className="container">
        {/* Section Title */}
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl">
            Our Tools & Resources
          </h2>
          <p className="text-lg text-body-color dark:text-body-color-dark">
            The hub is organized into two main categories to help you find what
            you need quickly.
          </p>
        </div>

        {/* Grid for the two lists */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:gap-x-16">
          {/* Column 1: Core Tools */}
          <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
            <h3 className="mb-6 text-2xl font-bold text-black dark:text-white">
              Core Data Tools
            </h3>
            <ul className="space-y-4">
              <ToolListItem text="SQL Solution Recommender" />
              <ToolListItem text="SQL Report Generator & DQ Check" />
              <ToolListItem text="DQ and Error Logging Form" />
              <ToolListItem text="Data Definitions" />
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
            <h3 className="mb-6 text-2xl font-bold text-black dark:text-white">
              Knowledge Base
            </h3>
            <ul className="space-y-4">
              <ToolListItem text="Data Glossary" />
              <ToolListItem text="SOP's Document" />
              <ToolListItem text="GitRepo" />
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Main Client Page Component ---
const AboutClientPage = () => {
  // --- Particle Logic ---
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

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
        color: "#00ff9a", // Green particles
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
  // --- Particle Logic End ---

  return (
    <>
      <Breadcrumb
        pageName="About Our Dataverse"
        description="A centralized web page where all of the tools will be available."
        init={init}
        options={particleOptions}
      />

      <AboutSectionOne />

      <AboutSectionTwo init={init} options={particleOptions} />
    </>
  );
};

export default AboutClientPage;