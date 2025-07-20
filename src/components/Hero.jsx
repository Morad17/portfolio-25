import React from "react";

const Hero = () => {
  return (
    <div className="hero">
      <div className="title-row">
        <h2 className="title">Hi I'm Morad</h2>
        <h3 className="sub-title">a Frontend Developer</h3>
      </div>
      <div className="about-me-row">
        <p className="about-me-text">
          Where creativity meets code; I craft thoughtful digital solutions with
          aesthetics and funcitonality at the core. From concept to code, I turn
          bold ideas into reality.
        </p>
      </div>
      <div className="links-row">
        <button className="contact-btn">Get In Touch</button>
      </div>
    </div>
  );
};

export default Hero;
