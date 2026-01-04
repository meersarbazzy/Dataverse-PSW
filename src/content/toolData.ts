import type { Tool } from "@/types/tool";
import { getEnv } from "@/utils/env";

//Manage cards here
export const toolData: Tool[] = [
  {
    id: 1,
    title: "SQL Solution Recommender",
    description: "Get intelligent recommendations for complex SQL queries...",
    href: getEnv("NEXT_PUBLIC_URL_SQL_RECOMMENDER", "#"),
    imageLight: "/images/cards/sqlsolution_lightmode.png", // light mode
    imageDark: "/images/cards/sqlsolution_darkmode.png", // dark mode
  },
  {
    id: 2,
    title: "Validata",
    description: "Our primary data validation tool...",
    href: getEnv("NEXT_PUBLIC_URL_VALIDATA", "#"),
    imageLight: "/images/cards/vdata_lightmode.png",
    imageDark: "/images/cards/vdata-darkmode.png",
  },
  {
    id: 3,
    title: "Data Quality & Error Logging Form",
    description: "Easily report data issues...",
    href: getEnv("NEXT_PUBLIC_URL_DATA_QUALITY_FORM", "#"),
    imageLight: "/images/cards/dq_error_lightmode.png",
    imageDark: "/images/cards/dq_error_darkmode.png",
  },
  {
    id: 4,
    title: "Data Definitions",
    description: "A clear, concise dictionary...",
    href: getEnv("NEXT_PUBLIC_URL_DATA_DEFINITIONS", "#"),
    imageLight: "/images/cards/data_def_lightmode.png",
    imageDark: "/images/cards/data_def_darkmode.png",
  },
  {
    id: 5,
    title: "Data Glossary",
    description: "The central business glossary...",
    href: getEnv("NEXT_PUBLIC_URL_DATA_GLOSSARY", "#"),
    imageLight: "/images/cards/data_glossary_lightmode.png",
    imageDark: "/images/cards/data_glossary_darkmode.png",
  },
  {
    id: 6,
    title: "SOP Documents",
    description: "Standard Operating Procedures...",
    href: getEnv("NEXT_PUBLIC_URL_SOP_DOCS", "#"),
    imageLight: "/images/cards/sop_lightmode.png",
    imageDark: "/images/cards/sop_darkmode.png",
  },
  {
    id: 7,
    title: "GitRepo",
    description: "Browse our code repositories...",
    href: getEnv("NEXT_PUBLIC_URL_GITREPO", "#"),
    imageLight: "/images/cards/git_repo_lightmode.png",
    imageDark: "/images/cards/git_repo_darkmode.png",
  },
  // ...baaki cards
];
