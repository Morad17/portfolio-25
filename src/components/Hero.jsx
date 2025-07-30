import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Spaceman } from "../assets/models/Spaceman";
import { Robot } from "../assets/models/Robot";

import sun from "../assets/images/sunset-sun.png";

const Hero = () => {
  const ref = useRef();
  const marqueeRef = useRef();

  // Animate Sun
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Marquee scroll animation - Make sure marqueeRef is attached to an element
  const { scrollYProgress: marqueeProgress } = useScroll({
    target: marqueeRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "350%"]);
  const backgroundX = useTransform(smoothProgress, [0, 1], ["0%", "-170%"]);

  // Marquee animations based on scroll
  const marqueeX1 = useTransform(marqueeProgress, [0, 1], ["100%", "-100%"]);
  const marqueeX2 = useTransform(marqueeProgress, [0, 1], ["-50%", "100%"]);

  return (
    <div className="hero page" ref={ref}>
      <div className="background-wrapper"></div>
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
          <div className="title-row">
            <h2 className="title">
              Morad Inc
              <div className="border" />
            </h2>
            <h3 className="heading">
              Frontend Development
              <div className="border" />
            </h3>
          </div>
          <div className="about-me-row">
            <h3 className="about-me-text">
              Where creativity meets code.
              <div className="border" />
            </h3>
            <h3 className="about-me-text">
              Crafting thoughtful digital solutions <div className="border" />
            </h3>
            <h3 className="about-me-text">
              that are Aesthetic and functional at the core.
              <div className="border" />
            </h3>
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

      {/* IMPORTANT: Attach marqueeRef to this container */}
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
              Concept to code | Turning bold ideas into reality |
            </motion.h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
