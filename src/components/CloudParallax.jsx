import React from "react";
import clouds from "../assets/images/sunset-full.png";
import sun from "../assets/images/sunset-sun.png";
import mountains from "../assets/images/sunset-mountains.png";
import foreground from "../assets/images/sunset-foreground.png";

const CloudParallax = () => {
  return (
    <div className="cloud-parallax">
      <div
        className="cloud-image"
        style={{ backgroundImage: `url(${clouds})` }}
      />
      <div
        className="cloud-image"
        style={{ backgroundImage: `url(${clouds})` }}
      />
    </div>
  );
};

export default CloudParallax;
