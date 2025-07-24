import React from "react";
import full from "../assets/images/sunset-all-2.png";
import sun from "../assets/images/sunset-sun.png";
import mountains from "../assets/images/sunset-mountains.png";
import foreground from "../assets/images/sunset-foreground.png";

const SunsetParallax = () => {
  return (
    <div className="sunset-parallax">
      <div
        className="sunset-full"
        style={{ backgroundImage: `url(${full})` }}
      />
      {/* <div className="sunset-sun" style={{ backgroundImage: `url(${sun})` }} /> */}
    </div>
  );
};

export default SunsetParallax;
