
import Hero from "@/components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dataverse",
  description: "A data related services hub",
  // other metadata
};

export default function Home() {
  return (
    <>
      <Hero />
      
    </>
  );
}
