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

const About = () => {
  const ref = useRef();
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

  // Local scroll for parallax elements
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Only track About section scroll when it's in view
  const { scrollYProgress: aboutProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smoothAboutProgress = useSpring(aboutProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

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
            <motion.p className="background-text" style={{ y: textY }}>
              Hi I'm Morad, a frontend developer from the UK. Aesthetics,
              Application and Avant-garde are factors I consider most when
              designing projects. My tools of choice are primarily React, Scss &
              Node, with others implemented based on the project. If you have a
              project in mind, or a killer idea send me a message!
            </motion.p>
          </div>
          <div className="center-div">
            <img className="selfie-image" src={selfie} alt="" />
          </div>
          <div className="right-div">
            <motion.div className="models-row">
              <motion.div
                animate={{ y: [0, -30, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Canvas
                  camera={{ position: [1, 1, 1] }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Environment preset="warehouse" />
                  <ReactLogo
                    scale={[1.75, 1.75, 1.75]}
                    position={[0, -2, 0]}
                    rotation={[0, 0, 0]}
                  />
                  <GithubLogo
                    scale={[1.75, 1.75, 1.75]}
                    position={[0, -2, 0]}
                    rotation={[0, 0, 0]}
                  />
                </Canvas>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
