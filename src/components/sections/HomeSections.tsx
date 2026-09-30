import { Hero } from "@/components/hero/Hero";
import { About } from "./About";
import { Contact } from "./Contact";
import { Experience } from "./Experience";
import { Contributions, Projects } from "./Projects";
import { Stack } from "./Stack";
import { Testimonial } from "./Testimonial";

export function HomeSections() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Contributions />
      <Experience />
      <Stack />
      <Testimonial />
      <Contact />
    </>
  );
}
