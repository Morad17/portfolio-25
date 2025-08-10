import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router";
import { motion, useScroll, useTransform } from "framer-motion";

const SERVICE_ID = "service_namecheap";
const CONTACT_TEMPLATE_ID = "template_morad_ink";
const PUBLIC_KEY = "EDluZEzYjp8dWFuTk";

const ContactUs = () => {
  const titleRef = useRef(null); // Add ref for title
  // Scroll-based animation for title
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const dividerScale = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState(""); // "success" or "error"
  const navigate = useNavigate();
  const onSubmit = (data) => {
    setStatus("Sending...");
    setStatusType(""); // reset
    emailjs.send(SERVICE_ID, CONTACT_TEMPLATE_ID, data, PUBLIC_KEY).then(
      () => {
        setStatus("Message sent");
        setStatusType("success");
        reset();
        setTimeout(() => {
          setStatus("");
          setStatusType("");
          navigate("/");
        }, 3000);
      },
      () => {
        setStatus("Failed to send. Please try again.");
        setStatusType("error");
        setTimeout(() => {
          setStatus("");
          setStatusType("");
        }, 5000); // Hide after 5 seconds
      }
    );
  };

  return (
    <div id="contact" className="contact-us">
      <div className="background-wrapper"></div>
      <motion.div
        className="page-title-div"
        ref={titleRef}
        style={{ opacity: titleOpacity, y: titleY }}
      >
        <h2 className="title">Contact Me.</h2>
        <motion.div
          className="divider-line"
          style={{ scaleX: dividerScale, transformOrigin: "left" }}
        />
      </motion.div>
      <div className="contact-content">
        <div className="contact-form">
          <div className="contact-wrapper">
            <div className="contact-row">
              <h2 className="page-title">Get In Touch</h2>
              <h2 className="page-title">Contact@morad.ink</h2>
            </div>

            <p className="contact-message">
              <strong>Drop Me a Message</strong>
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="">Name</label>
                <input
                  className="name-group"
                  type="text"
                  placeholder="Name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Message</label>
                <textarea
                  className="textarea"
                  placeholder="Message"
                  {...register("message", {
                    required: "Message is required",
                  })}
                />
              </div>
              <motion.div
                className="button-container magic-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <motion.button
                  className="submit-btn"
                  type="submit"
                  initial={{
                    background: `linear-gradient(135deg, black 0%, transparent 0%)`,
                  }}
                  whileHover={{
                    y: -5,
                    background: `linear-gradient(135deg, black 100%, transparent 100%)`,
                  }}
                  transition={{
                    duration: 0.9,
                    ease: "easeInOut",
                  }}
                >
                  Submit
                </motion.button>
              </motion.div>
            </form>
            {/* Error messages */}
            <div className="validation-message" style={{ color: "red" }}>
              {errors.firstName && <p>{errors.name.message}</p>}
              {errors.email && <p>{errors.email.message}</p>}
              {errors.message && <p>{errors.message.message}</p>}
            </div>
            <div className={`status-message ${statusType}`}>
              {status && <p>{status}</p>}
            </div>
          </div>
        </div>
        <div className="contact-image"></div>
      </div>
    </div>
  );
};

export default ContactUs;
