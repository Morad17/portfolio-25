// contexts/ScrollContext.js
import React, { createContext, useContext, useState } from "react";

const ScrollContext = createContext();

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};

export const ScrollProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToSection = (sectionId) => {
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
  };

  return (
    <ScrollContext.Provider
      value={{
        activeSection,
        setActiveSection,
        isScrolling,
        setIsScrolling,
        scrollToSection,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};
