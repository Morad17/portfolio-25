import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

//logo
import hLogo from "../assets/images/horizon-sales-logo.png";
import mLogo from "../assets/images/movie-binge-logo.png";

//Gif
import hGif from "../assets/gif/horizon-sales.gif";
import mGif from "../assets/gif/movie-binge.gif";
//Svg
import aiSvg from "../assets/svg/ai-svg.svg";
import questionSvg from "../assets/svg/question-svg.svg";
import emailSvg from "../assets/svg/email-svg.svg";
import securitySvg from "../assets/svg/security-svg.svg";
import mobileSvg from "../assets/svg/responsive.svg";
import blogSvg from "../assets/svg/blog.svg";
import authSvg from "../assets/svg/auth-svg.svg";
import saveSvg from "../assets/svg/save.svg";
import starSvg from "../assets/svg/star.svg";
import hostingSvg from "../assets/svg/hosting.svg";

const Projects = () => {
  const [project, setProject] = useState("horizonProject");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const titleRef = useRef(null); // Add ref for title

  // Scroll-based animation for title
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const dividerScale = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

  // Track mouse position within the container
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  // Create SVG mapping object
  const svgMap = {
    aiSvg,
    questionSvg,
    emailSvg,
    securitySvg,
    mobileSvg,
    blogSvg,
    authSvg,
    saveSvg,
    starSvg,
    hostingSvg,
  };

  // Project data structure
  const projectsData = {
    horizonProject: {
      title: "Horizon Sales",
      gifLink: hGif,
      infoText:
        "A clean and simple Sales and Marketing website, that implements ai to assist the user with any help. Includes features specific to the client, such as online questionnaire, 5 forms, blog and a secured webpage.",
      infoPoints: [
        { svgKey: "authSvg", text: "User Authentication" },
        { svgKey: "starSvg", text: "Rate & Review System" },
        { svgKey: "saveSvg", text: "Like & Bookmark feature" },
        { svgKey: "securitySvg", text: "Account Privacy" },
        { svgKey: "mobileSvg", text: "Responsive Design" },
        { svgKey: "hostingSvg", text: "Web & Domain Hosting" },
      ],
      url: "https://horizon-sales.co.uk/",
      color: "rgba(0, 0, 0,0.8)",
    },
    movieBingeProject: {
      title: "Movie Binge",
      gifLink: mGif,
      infoText:
        "A movie rating website, using TMDB database, listing latest/trending/popular movies. Users sign up and can rate/review movies, search based on criteria or genre and receive all the info on the movie.",
      infoPoints: [
        { svgKey: "aiSvg", text: "Ai Chatbot" },
        { svgKey: "emailSvg", text: "Email Integration" },
        { svgKey: "questionSvg", text: "Page Questionnaire" },
        { svgKey: "securitySvg", text: "Secured Webpage" },
        { svgKey: "mobileSvg", text: "Mobile Friendly" },
        { svgKey: "hostingSvg", text: "Web & Domain Hosting" },
      ],
      url: "https://movie-binge-app.netlify.app/",
      color: "rgba(136, 0, 21,0.8)",
    },
  };

  // Get current project data based on state
  const currentProject = projectsData[project];

  const InfoCard = () => (
    <div className="project-info-container" ref={containerRef}>
      <div
        className="magic-light"
        style={{
          left: mousePosition.x - 150,
          top: mousePosition.y - 150,
        }}
      />

      <motion.div
        className="info-title-container magic-item"
        key={`title-${project}`} // Force re-render
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        whileHover={{
          y: -5,
          background: `linear-gradient(135deg, ${currentProject.color} 100%, transparent 100%)`,
        }}
      >
        <h2 className="info-title">{currentProject.title}</h2>
      </motion.div>

      <motion.div
        className="info-content"
        key={`content-${project}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container-left">
          <motion.div
            className="gif-container magic-item"
            initial={{
              background:
                "linear-gradient(135deg, rgba(147, 51, 234, 0.3) 0%, transparent 0%)",
            }}
            whileHover={{
              y: -5,
              background:
                "linear-gradient(135deg, rgba(147, 51, 234, 0.3) 100%, transparent 100%)",
            }}
            transition={{
              duration: 0.9,
              ease: "easeInOut",
            }}
          >
            <img
              className="thumb"
              src={currentProject.gifLink}
              alt={currentProject.title}
            />
          </motion.div>

          <motion.div
            className="info-text-container magic-item"
            initial={{
              background: `linear-gradient(135deg, ${currentProject.color} 0%, transparent 0%)`,
            }}
            whileHover={{
              y: -5,
              background: `linear-gradient(135deg, ${currentProject.color} 100%, transparent 100%)`,
            }}
            transition={{
              duration: 0.9,
              ease: "easeInOut",
            }}
          >
            <p className="info-text">{currentProject.infoText}</p>
          </motion.div>
        </div>

        <div className="container-right">
          <div className="info-points">
            {currentProject.infoPoints.map((point, index) => (
              <motion.div
                key={index}
                className="info-point magic-item"
                initial={{
                  background: `linear-gradient(135deg, ${currentProject.color} 0%, transparent 0%)`,
                }}
                whileHover={{
                  y: -5,
                  background: `linear-gradient(135deg, ${currentProject.color} 100%, transparent 100%)`,
                }}
                transition={{
                  duration: 0.9,
                  ease: "easeInOut",
                }}
              >
                <img className="info-svgs" src={svgMap[point.svgKey]} alt="" />
                <p className="point-text">{point.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="button-container magic-item"
        key={`button-${project}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <motion.a
          href={currentProject.url}
          className="btn-link"
          target="_blank"
          rel="noopener noreferrer"
          initial={{
            background: `linear-gradient(135deg, ${currentProject.color} 0%, transparent 0%)`,
          }}
          whileHover={{
            y: -5,
            background: `linear-gradient(135deg, ${currentProject.color} 100%, transparent 100%)`,
          }}
          transition={{
            duration: 0.9,
            ease: "easeInOut",
          }}
        >
          Live Page
        </motion.a>
      </motion.div>
    </div>
  );

  return (
    <div id="projects" className="projects page">
      <motion.div
        className="page-title-div"
        ref={titleRef}
        style={{ opacity: titleOpacity, y: titleY }}
      >
        <h2 className="title">Previous Work.</h2>
        <motion.div
          className="divider-line"
          style={{ scaleX: dividerScale, transformOrigin: "left" }}
        />
      </motion.div>

      <div className="projects-content">
        <div className="project-cards">
          <h2 className="title-caption">Select a project</h2>
          <motion.div
            className={`card card-1 ${
              project === "horizonProject" ? "active" : ""
            }`}
            onClick={() => setProject("horizonProject")}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="image-container">
              <motion.img
                className="card-thumbnail"
                src={hLogo}
                alt="Horizon Sales"
                initial={{ y: 50, scale: 1, rotate: 0 }}
                whileHover={{
                  y: -10,
                  scale: 1.1,
                  rotate: -6,
                  zIndex: 10,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
              />
            </div>
            <h2 className="card-title">Horizon Sales</h2>
          </motion.div>

          <motion.div
            className={`card card-2 ${
              project === "movieBingeProject" ? "active" : ""
            }`}
            onClick={() => setProject("movieBingeProject")}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="image-container">
              <motion.img
                className="card-thumbnail"
                src={mLogo}
                alt="Movie Binge"
                initial={{ y: 50, scale: 1, rotate: 0 }}
                whileHover={{
                  y: -10,
                  scale: 1.1,
                  rotate: 9,
                  zIndex: 10,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
              />
            </div>
            <h2 className="card-title">Movie Binge</h2>
          </motion.div>
        </div>
        <div className="projects-info">
          <InfoCard />
        </div>
      </div>
    </div>
  );
};

export default Projects;
