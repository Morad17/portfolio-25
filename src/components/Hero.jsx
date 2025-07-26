import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Spaceman } from "./Spaceman";

import sun from "../assets/images/sunset-sun.png";

const Hero = () => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const backgroundY = useTransform(smoothProgress, [0, 1], ["0%", "280%"]);
  const backgroundX = useTransform(smoothProgress, [0, 1], ["0%", "-120%"]);

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

          <div className="about-me-row">
            <p className="about-me-text">
              Where creativity meets code; I craft thoughtful digital solutions
              with aesthetics and funcitonality at the core.From concept to
              code, I turn bold ideas into reality.
            </p>
          </div>
          <div className="links-row">
            <button className="contact-btn">Get In Touch</button>
          </div>
        </div>
        <div className="model-row">
          <Canvas
            camera={{ position: [1, 1, 3] }}
            style={{ width: "100%", height: "100%" }}
          >
            <Environment preset="dawn" />
            <Spaceman
              scale={[1, 1, 1]}
              rotation={[Math.PI / -4, 0, -Math.PI / -7]} // Added Z-axis tilt (-15 degrees)
            />
          </Canvas>
        </div>
      </section>
    </div>
  );
};

export default Hero;
