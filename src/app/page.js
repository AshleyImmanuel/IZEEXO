import Hero from "@/components/Hero";
import FeaturedWorks from "@/components/FeaturedWorks";
import ProcessSection from "@/components/ProcessSection";
import AboutSnippet from "@/components/AboutSnippet";
import ServicesBento from "@/components/ServicesBento";


export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedWorks />
      <ServicesBento />
      <ProcessSection />
      <AboutSnippet />
    </main>
  );
}
