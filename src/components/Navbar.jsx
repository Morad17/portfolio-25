import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="main-nav">
      <motion.div
        className="burger"
        onClick={toggleMenu}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.span
          className="burger-line"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 8 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        <motion.span
          className="burger-line"
          animate={{
            opacity: isOpen ? 0 : 1,
            x: isOpen ? -20 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
        <motion.span
          className="burger-line"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -8 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.ul
        className="main-nav-links"
        animate={{
          x: isOpen ? 0 : -100,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <li>
          <Link className="link" to="/" onClick={toggleMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link className="link" to="/test" onClick={toggleMenu}>
            About
          </Link>
        </li>
        <li>
          <Link className="link" to="/" onClick={toggleMenu}>
            Projects
          </Link>
        </li>
        <li>
          <Link className="link" to="/" onClick={toggleMenu}>
            Contact
          </Link>
        </li>
      </motion.ul>
      <div className="nav-logo">
        <h2>MI</h2>
      </div>
    </nav>
  );
};

export default Navbar;
