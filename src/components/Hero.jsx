import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Spaceman } from "../assets/models/Spaceman";
import { Robot } from "../assets/models/Robot";

import sun from "../assets/images/sunset-sun.png";

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

const Hero = () => {
  const ref = useRef();
  const marqueeRef = useRef();
  const titleRef = useRef(); // Add ref for title tracking

  // Animate Sun
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Marquee scroll animation
  const { scrollYProgress: marqueeProgress } = useScroll({
    target: marqueeRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "400%"]);
  const backgroundX = useTransform(smoothProgress, [0, 1], ["0%", "-170%"]);

  // Marquee animations based on scroll
  const marqueeX1 = useTransform(marqueeProgress, [0, 1], ["100%", "-100%"]);
  const marqueeX2 = useTransform(marqueeProgress, [0, 1], ["-50%", "100%"]);

  return (
    <div id="home" className="hero page" ref={ref}>
      <div className="background-wrapper"></div>
      {/* Sun Animation */}
      <motion.div
        className="sunset-sun"
        style={{
          backgroundImage: `url(${sun})`,
          y: backgroundY,
          x: backgroundX,
        }}
      />
      <section className="center-section">
        <div className="center-row">
          <div className="title-row" ref={titleRef}>
            <h2 className="title">
              <AnimatedText text="Morad Inc" delay={1} />
              {/* Animated border */}
              <motion.div
                className="border"
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                transition={{
                  duration: 1.2,
                  delay: 0.5,
                  ease: "easeInOut",
                }}
              />
            </h2>

            <h3 className="heading">
              <AnimatedText text="Frontend Development" delay={0.5} />
              {/* Animated border with delay */}
              <motion.div
                className="border"
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={{ clipPath: "inset(0% 0 0 0)" }}
                transition={{
                  duration: 1.2,
                  delay: 1.2,
                  ease: "easeOut",
                }}
              />
            </h3>
          </div>

          <div className="about-me-row">
            {[
              {
                text: "Where creativity meets code.",
                delay: 0,
                highlightWords: ["creativity"],
              },
              {
                text: "Crafting thoughtful digital solutions",
                delay: 0.6,
                highlightWords: [],
              },
              {
                text: "Balancing aesthetics with function",
                delay: 0.9,
                highlightWords: ["aesthetics", "function"],
              },
              {
                text: "Thats it.",
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

        <motion.div className="robot-model-row">
          <motion.div
            animate={{ y: [0, -30, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Canvas
              camera={{ position: [1, 1, 4] }}
              style={{ width: "100%", height: "100%" }}
            >
              <Environment preset="warehouse" />
              <Robot
                scale={[1.75, 1.75, 1.75]}
                position={[0, -2, 0]}
                rotation={[0, 0, 0]}
              />
            </Canvas>
          </motion.div>
        </motion.div>
      </section>

      <div className="marquee-container" ref={marqueeRef}>
        <div className="bottom-row">
          <div className="marquee">
            <motion.h2 style={{ x: marqueeX1 }} className="marquee-text">
              Concept to code | Turning bold ideas into reality |
            </motion.h2>
          </div>
        </div>

        <div className="bottom-row">
          <div className="marquee">
            <motion.h2 style={{ x: marqueeX2 }} className="marquee-text">
              Static Sites | E-commerce Sites | Databasing | SEO | Responsive
              Designs
            </motion.h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
