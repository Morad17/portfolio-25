import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import full from "../assets/images/sunset-full.png";
import sun from "../assets/images/sunset-sun.png";
import horizon from "../assets/images/sunset-horizon.png";
import mountains from "../assets/images/sunset-mountain.png";
import foreground from "../assets/images/sunset-foreground.png";

const SunsetParallax = () => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const backgroundW = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const backgroundV = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const backgroundX = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  return (
    <div className="sunset-parallax" ref={ref}>
      <motion.div
        className="sunset-mountains"
        style={{ backgroundImage: `url(${mountains})`, y: backgroundV }}
      />
      <motion.div
        className="sunset-horizon"
        style={{ backgroundImage: `url(${horizon})`, y: backgroundW }}
      />
      <motion.div
        className="sunset-foreground"
        style={{ backgroundImage: `url(${foreground})`, y: backgroundY }}
      />

      {/* <div
        className="sunset-full"
        style={{ backgroundImage: `url(${full})` }}
      /> */}
      <motion.div
        className="sunset-sun"
        style={{ backgroundImage: `url(${sun})`, y: backgroundX }}
      />
    </div>
  );
};

export default SunsetParallax;
