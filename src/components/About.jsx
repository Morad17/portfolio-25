import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import selfie from "../assets/images/self-image.jpg";
import sceneForeground from "../assets/images/sForeground.png";
import sceneMoon from "../assets/images/scene-moon-2.png";
import sceneMountain1 from "../assets/images/sMountain1.png";
import sceneMountain2 from "../assets/images/sMountain2.png";
import Particles from "./ParticleAnimation";
import { GithubLogo } from "../assets/models/GithubLogo";
import { ReactLogo } from "../assets/models/ReactLogo";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import WordSphere from "./WordSphere";

const About = () => {
  const ref = useRef(); // Main about section ref
  const titleRef = useRef(); // Separate ref for title
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer to track when About section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when 10% of About section is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Staggered animation for text
  const AnimatedText = ({ text, delay = 0, highlightWords = [] }) => {
    const words = text.split(" ");

    return (
      <span>
        {words.map((word, index) => {
          const cleanWord = word.replace(/[.,!?;]/g, "").toLowerCase();
          const isHighlighted = highlightWords.includes(cleanWord);

          return (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: delay + index * 0.1,
                ease: "easeOut",
              }}
              whileHover={
                isHighlighted
                  ? {
                      scale: 1.1,
                      color: "#a855f7",
                      textShadow: "0 0 15px rgba(168, 85, 247, 0.8)",
                    }
                  : {}
              }
              style={{
                display: "inline-block",
                marginRight: "0.3em",
                color: isHighlighted ? "#9333ea" : "inherit",
                fontWeight: isHighlighted ? "600" : "inherit",
                textShadow: isHighlighted
                  ? "0 0 10px rgba(147, 51, 234, 0.5)"
                  : "none",
                cursor: isHighlighted ? "pointer" : "default",
              }}
            >
              {word}
            </motion.span>
          );
        })}
      </span>
    );
  };

  // Separate scroll tracking for title
  const { scrollYProgress: titleScrollProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "end start"],
  });

  // Main parallax scroll tracking
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: aboutProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothAboutProgress = useSpring(aboutProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Title animations using separate scroll progress
  const titleOpacity = useTransform(titleScrollProgress, [0, 0.3], [0, 1]);
  const titleY = useTransform(titleScrollProgress, [0, 0.3], [50, 0]);
  const dividerScale = useTransform(titleScrollProgress, [0.2, 0.5], [0, 1]);

  // Only apply background colors when About section is in view
  const backgroundColor = useTransform(
    smoothAboutProgress,
    [0, 0.1, 0.2, 0.4, 0.5, 0.6],
    isInView
      ? [
          // Stage 1: All blue
          "linear-gradient(to bottom, #3588c2, #3588c2, #3588c2, #3588c2)",

          // Stage 2: Start with blended transition color
          "linear-gradient(to bottom, #3588c2, #3588c2, #2a5a8a, rgb(9, 3, 72))",

          // Stage 3: More blended intermediate colors
          "linear-gradient(to bottom, #3588c2, #2a5a8a, rgb(62, 5, 38), rgb(115, 8, 69))",

          // Stage 4: Continue blending
          "linear-gradient(to bottom, #2a5a8a, rgb(62, 5, 38), rgb(137, 4, 55), rgb(160, 0, 41))",

          // Stage 5: Near sunset
          "linear-gradient(to bottom, rgb(62, 5, 38), rgb(137, 4, 55), rgb(207, 47, 20), rgb(254, 95, 1))",

          // Stage 6: Full sunset
          "linear-gradient(to bottom, rgb(9, 3, 72), rgb(115, 8, 69), rgb(160, 0, 41), rgb(254, 95, 1))",
        ]
      : [
          "transparent",
          "transparent",
          "transparent",
          "transparent",
          "transparent",
          "transparent",
        ]
  );

  // Parallax elements (existing code)
  const sMountainY1 = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]);
  const sMountainY2 = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  const sForegroundY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  return (
    <div className="about page" ref={ref}>
      <motion.div
        className="page-title-div"
        ref={titleRef}
        style={{ opacity: titleOpacity, y: titleY }}
      >
        <h2 className="title">About Me.</h2>{" "}
        <motion.div
          className="divider-line"
          style={{ scaleX: dividerScale, transformOrigin: "left" }}
        />
      </motion.div>
      {/* Dynamic sunset background*/}
      <motion.div
        className="background-wrapper"
        style={{
          background: backgroundColor,
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -10,
        }}
      >
        <Particles particleCount={300} moveParticlesOnHover={true} />
      </motion.div>
      <div className="sunset-parallax">
        <motion.div
          className="sunset-slide"
          style={{ backgroundImage: `url(${sceneMountain1})`, y: sMountainY1 }}
        />
        <motion.div
          className="sunset-slide"
          style={{ backgroundImage: `url(${sceneMountain2})`, y: sMountainY2 }}
        />
        <motion.div
          className="sunset-slide"
          style={{
            backgroundImage: `url(${sceneForeground})`,
            y: sForegroundY,
          }}
        />
        <div className="content-div">
          <div className="left-div">
            {/* <motion.p className="background-text" style={{ y: textY }}>
              Hi I'm Morad, a frontend developer from the UK. Aesthetics,
              Application and Avant-garde are factors I consider most when
              designing projects. My tools of choice are primarily React, Scss &
              Node, with others implemented based on the project. If you have a
              project in mind, or a killer idea send me a message!
            </motion.p> */}
            <div className="about-me-row">
              {[
                {
                  text: "Hi I'm Morad, a frontend developer from the UK. ",
                  delay: 0,
                  highlightWords: [],
                },
                {
                  text: "Aesthetics,Application and Avant-garde are factors",
                  delay: 0.6,
                  highlightWords: [],
                },
                {
                  text: "I consider most when designing projects.",
                  delay: 0.6,
                  highlightWords: [],
                },
                {
                  text: " My tools of choice are primarily React, Scss & Node,",
                  delay: 0.9,
                  highlightWords: [],
                },
                {
                  text: "and others implemented based on the project.",
                  delay: 0.9,
                  highlightWords: [],
                },

                {
                  text: " If you have a project in mind, or a killer idea,",
                  delay: 1.2,
                  highlightWords: [],
                },

                {
                  text: "send me a message!",
                  delay: 1.2,
                  highlightWords: [],
                },
              ].map((item, index) => (
                <h3 key={index} className="about-me-text">
                  <AnimatedText
                    text={item.text}
                    delay={item.delay}
                    highlightWords={item.highlightWords}
                  />
                  {/* Staggered border animations */}
                  <motion.div
                    className="border"
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    animate={{ clipPath: "inset(0% 0 0 0)" }}
                    transition={{
                      duration: 1,
                      delay: 2,
                      ease: "easeOut",
                    }}
                  />
                </h3>
              ))}
            </div>
          </div>
          <div className="right-div">
            <WordSphere />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
