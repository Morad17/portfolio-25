import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import music from "../assets/sounds/ambient-music.mp3";
import mute from "../assets/svg/mute-black.svg";
import play from "../assets/svg/play-audio-black.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isPlaying, setIsPlaying] = useState(true); // Start as true for auto-play
  const audioRef = React.useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const targetY = element.offsetTop;
      const startY = window.scrollY;
      const distance = targetY - startY;
      const duration = 2500; // 2.5 seconds - adjust this for speed
      const startTime = performance.now();

      const ease = (t) => {
        // Smooth easing curve
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      };

      const animateScroll = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = ease(progress);

        const currentY = startY + distance * easedProgress;
        window.scrollTo(0, currentY);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
      setActiveSection(sectionId);
    }
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  // Auto-start audio when component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.04; // Set volume to 30% (quieter)

      // Try to auto-play (modern browsers may block this)
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Auto-play started successfully
            setIsPlaying(true);
          })
          .catch((error) => {
            // Auto-play was prevented, user interaction required
            console.log("Auto-play prevented:", error);
            setIsPlaying(false);
          });
      }
    }
  }, []);

  // Handle play/pause state changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Play failed:", error);
            setIsPlaying(false);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Track scroll position to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"];
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
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set CSS custom property
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--nav-bg-color",
      isOpen ? "rgba(0, 0, 0, 0.94)" : "transparent"
    );
  }, [isOpen]);

  return (
    <motion.nav
      className="main-nav"
      animate={{
        backgroundColor: isOpen ? "rgba(0, 0, 0, 0.94)" : "rgba(0, 0, 0, 0)",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <motion.div
        className="burger"
        onClick={toggleMenu}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="burger-line"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 8 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        <motion.span
          className="burger-line"
          animate={{
            opacity: isOpen ? 0 : 1,
            x: isOpen ? -20 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        <motion.span
          className="burger-line"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -8 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.ul
        className="main-nav-links"
        animate={{
          x: isOpen ? 0 : -100,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <li>
          <a
            href="#"
            className={`link ${activeSection === "home" ? "active" : ""}`}
            onClick={() => scrollToSection("home")}
          >
            Home
          </a>
        </li>
        <li>
          <a
          href="#"
            className={`link ${activeSection === "about" ? "active" : ""}`}
            onClick={() => scrollToSection("about")}
          >
            About
          </a>
        </li>
        <li>
          <a
          href="#"
            className={`link ${activeSection === "projects" ? "active" : ""}`}
            onClick={() => scrollToSection("projects")}
          >
            Projects
          </a>
        </li>
        <li>
          <a
          
            className={`link ${activeSection === "contact" ? "active" : ""}`}
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </a>
        </li>
      </motion.ul>

      <div className="audio-btn-div">
        <audio ref={audioRef} src={music} loop preload="auto" />
        <h3>Play Me</h3>
        <motion.button
          className="audio-toggle"
          onClick={toggleAudio}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? (
            <img className="audio-svg" src={play} alt="" />
          ) : (
            <img className="audio-svg" src={mute} alt="" />
          )}
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
