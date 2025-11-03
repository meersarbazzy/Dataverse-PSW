import { Metadata } from "next";
import AboutClientPage from "./AboutClientPage"; 

export const metadata: Metadata = {
  title: "About Our Data Hub",
  description: "Learn about the Data Hub and the tools we provide.",
};

export default function AboutPage() {
  return <AboutClientPage />;
}