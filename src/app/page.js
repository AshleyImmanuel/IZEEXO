import Hero from "@/components/Hero";
import FeaturedWorks from "@/components/FeaturedWorks";
import ProcessSection from "@/components/ProcessSection";
import AboutSnippet from "@/components/AboutSnippet";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedWorks />
      <ProcessSection />
      <AboutSnippet />
    </main>
  );
}
