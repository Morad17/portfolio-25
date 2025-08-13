import React, { useState, useEffect, useMemo, useCallback } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

const Home = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolling, setIsScrolling] = useState(false);

  const sections = useMemo(() => ["home", "about", "projects", "contact"], []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setIsScrolling(true);

      const targetY = element.offsetTop;
      const startY = window.scrollY;
      const distance = targetY - startY;
      const duration = 2000;
      const startTime = performance.now();

      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeProgress =
          progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        const currentY = startY + distance * easeProgress;
        window.scrollTo(0, currentY);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          setIsScrolling(false);
        }
      };

      requestAnimationFrame(animateScroll);
      setActiveSection(sectionId);
    }
  }, []); 

  // Wheel-based snap scrolling
  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      const currentIndex = sections.indexOf(activeSection);

      if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        e.preventDefault();
        scrollToSection(sections[currentIndex + 1]);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        e.preventDefault();
        scrollToSection(sections[currentIndex - 1]);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeSection, isScrolling, sections, scrollToSection]);

  // Track current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolling, sections]);

  return (
    <div className="home">
      <Hero />
      <About />
      <Projects />
      <Contact />
    </div>
  );
};

export default Home;
