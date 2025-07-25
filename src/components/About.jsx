import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import full from "../assets/images/sunset-full.png";
import sun from "../assets/images/sunset-sun.png";
import horizon from "../assets/images/sunset-horizon.png";
import mountain from "../assets/images/sunset-mountain.png";
import mountains from "../assets/images/sunset-mountains.png";

import foreground from "../assets/images/sunset-foreground.png";

const About = () => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  //Transion Speeds Sunset
  const sHorizonY = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);
  const sMountains = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const sMountain = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  const sForegroundY = useTransform(scrollYProgress, [0, 1], ["0%", "00%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  return (
    <div className="about page" ref={ref}>
      <div className="sunset-parallax">
        <motion.p className="background-text">
          Hi I'm Morad, a frontend developer from the UK. Aesthetics,
          Application and Avant-garde are factors I consider most when designing
          projects.My tools of choice are primarilty React, Scss & Node, with
          others implemented based on the project. If you have a project in
          mind, or a killer idea send me a message!
        </motion.p>

        <motion.div
          className="sunset-horizon"
          style={{ backgroundImage: `url(${horizon})`, y: sHorizonY }}
        />
        <motion.div
          className="sunset-mountains"
          style={{ backgroundImage: `url(${mountains})`, y: sMountains }}
        />
        <motion.div
          className="sunset-foreground"
          style={{ backgroundImage: `url(${foreground})`, y: sForegroundY }}
        />
        <motion.div
          className="sunset-foreground"
          style={{ backgroundImage: `url(${mountain})`, y: sMountain }}
        />
      </div>
    </div>
  );
};

export default About;
