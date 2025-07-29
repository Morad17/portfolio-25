import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Spaceman } from "../assets/models/Spaceman";
import { Robot } from "../assets/models/Robot";

import sun from "../assets/images/sunset-sun.png";

const Hero = () => {
  const ref = useRef();
  //Animate Sun
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "350%"]);
  const backgroundX = useTransform(smoothProgress, [0, 1], ["0%", "-170%"]);

  return (
    <div className="hero page" ref={ref}>
      <motion.div
        className="sunset-sun"
        style={{
          backgroundImage: `url(${sun})`,
          y: backgroundY,
          x: backgroundX,
        }}
      />
      <section className="center-section">
        <div className="section-content">
          <div className="title-row">
            <h2 className="title">Hi I'm Morad</h2>
            <h3 className="heading">a Frontend Developer</h3>
          </div>

          <div className="center-row">
            <div className="about-me-row-left">
              <p className="about-me-text">Where creativity meets code.</p>
              <p className="about-me-text">
                Crafting thoughtful digital solutions.
              </p>
              <p className="about-me-text">
                Aesthetics and functionality at the core of each project.
              </p>
            </div>

            <motion.div className="robot-model-row">
              <motion.div
                animate={{ y: [0, -30, 0] }} // Float up and down
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

            <div className="about-me-row-right">
              <p className="about-me-text">From concept to code.</p>
              <p className="about-me-text">Turning bold ideas into reality.</p>
              <p className="about-me-text">Thats all.</p>
            </div>
          </div>
        </div>
      </section>
      <div className="spaceman-model-row">
        <Canvas
          camera={{ position: [1, 1, 3] }}
          style={{ width: "100%", height: "100%" }}
        >
          <Environment preset="dawn" />
          <Spaceman scale={[1.5, 1.5, 1.5]} rotation={[Math.PI / -4, 0, 0]} />
        </Canvas>
      </div>
    </div>
  );
};

export default Hero;
