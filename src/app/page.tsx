import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import HighScores from "@/components/HighScores";
import Trophies from "@/components/Trophies";
import Terminal from "@/components/Terminal";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { AchievementsProvider } from "@/components/AchievementSystem";

export default function Home() {
  return (
    <AchievementsProvider>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <HighScores />
        <Trophies />
        <Contact />
      </main>
      <Footer />
      <Terminal />
    </AchievementsProvider>
  );
}
