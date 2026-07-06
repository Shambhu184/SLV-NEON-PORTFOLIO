import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Capabilities from "@/components/Capabilities";
import Flagship from "@/components/Flagship";
import Stats from "@/components/Stats";
import Ticker from "@/components/Ticker";
import Pipeline from "@/components/Pipeline";
import Industries from "@/components/Industries";
import Pillars from "@/components/Pillars";
import CTA from "@/components/CTA";
import Founders from "@/components/Founders";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Capabilities />
        <Flagship />
        {/* <Stats /> */}
        <Ticker />
        <Pipeline />
        <Industries />
        <Pillars />
        <CTA />
        <Founders />
      </main>
      <Footer />
    </>
  );
}
