import Hero from "@/components/Hero";
import People from "@/components/People";
import Roadmap from "@/components/ResearchFocus";
import News from "@/components/News";
import WorldMap from "@/components/Map";
import Teachings from "@/components/Teachings";
import Sponsors from "@/components/Sponsors";
import Gallery from "@/components/Gallery";
import JoinUs from "@/components/JoinUs";
import Videos from "@/components/Videos";
import FloatingTop from "@/components/FloatingTop";
import AboutUs from "@/components/AboutUs";
import CoreValues from "@/components/Values";
import RecentResearch from "@/components/RecentResearch";
import Department from "@/components/Department";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  // Absolute so the root layout's "%s | AIMS Lab" template is not appended.
  title: {
    absolute:
      "AIMS Lab | Artificial Intelligence and Multiphysics Simulations - University of Michigan",
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <main className="relative bg-white flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        {/*
          Server-rendered heading + summary so crawlers see the lab's identity
          immediately. The visible hero headline is animated in on the client.
        */}
        <h1 className="sr-only">
          AIMS Lab - Artificial Intelligence and Multiphysics Simulations Lab at the
          University of Michigan
        </h1>
        <p className="sr-only">
          The Artificial Intelligence and Multiphysics Simulations (AIMS) Lab is a
          research group at the University of Michigan, led by Professor Majdi
          Radaideh in the Department of Nuclear Engineering and Radiological
          Sciences. The lab combines physics-based modeling with modern machine
          learning to advance optimization, control, and safety of complex systems
          such as nuclear reactors.
        </p>
        <Hero />
        <AboutUs />
        <Department />
        <CoreValues />
        <News />
        <RecentResearch />
        <Roadmap />
        <Videos 
          title="Meet Professor "
          highlightedText="Majdi"
          videoSrc="https://www.youtube.com/embed/64mYe6pMimw?si=GZwnBQ-6gVZApUI3"
          thumbnailSrc="/meet_majdi.png"
          thumbnailAlt="Hero Video"
        />
        <People />
        <Videos 
          title="Meet the "
          highlightedText="Team"
          videoSrc="https://www.youtube.com/embed/bFVfeifJ2kg?si=5decMkFOIjMvNWDx"
          thumbnailSrc="/meet_team.jpg"
          thumbnailAlt="Hero Video"
        />
        <WorldMap />
        <Teachings />
        <Sponsors />
        <Gallery />
        <JoinUs />
        <FloatingTop />
      </div>
    </main>
  );
}
