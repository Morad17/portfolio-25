import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

import music from "../assets/sounds/ambient-music.mp3";
import mute from "../assets/svg/mute-black.svg";
import play from "../assets/svg/play-audio-black.svg";
import { useStore } from "@react-three/fiber";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isPlaying, setIsPlaying] = useState(true); // Start as true for auto-play
  const audioRef = React.useRef(null);
  const [audio, setAudio] = useState("");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setActiveSection(sectionId);
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

  return (
    <nav className="main-nav">
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
            className={`link ${activeSection === "home" ? "active" : ""}`}
            onClick={() => scrollToSection("home")}
          >
            Home
          </a>
        </li>
        <li>
          <a
            className={`link ${activeSection === "about" ? "active" : ""}`}
            onClick={() => scrollToSection("about")}
          >
            About
          </a>
        </li>
        <li>
          <a
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
    </nav>
  );
};

export default Navbar;
