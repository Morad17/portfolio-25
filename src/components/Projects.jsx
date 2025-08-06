import { useState } from "react";
import { motion } from "framer-motion"; // Add this import
import { IoIosPerson } from "react-icons/io";
import { Link } from "react-router";

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
import mobileSvg from "../assets/svg/mobile-svg.svg";
import blogSvg from "../assets/svg/blog.svg";
import authSvg from "../assets/svg/auth.svg";
import saveSvg from "../assets/svg/save.svg";
import starSvg from "../assets/svg/star.svg";

const Projects = () => {
  const [project, setProject] = useState("horizonProject");

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
        { svgKey: "saveSvg", text: "Save,Like & Bookmark feature" },
        { svgKey: "securitySvg", text: "Account Privacy" },
        { svgKey: "mobileSvg", text: "Responsive Design" },
      ],
      url: "https://horizon-sales.co.uk/",
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
      ],
      url: "https://movie-binge-app.netlify.app/",
    },
  };

  // Get current project data based on state
  const currentProject = projectsData[project];

  const InfoCard = () => (
    <div className="project-info-container">
      <div className="info-title-container">
        <h2 className="info-title">{currentProject.title}</h2>
      </div>
      <div className="info-content">
        <div className="container-left">
          <div className="gif-container">
            <img
              className="thumb"
              src={currentProject.gifLink}
              alt={currentProject.title}
            />
          </div>
          <div className="info-text-container">
            <p className="info-text">{currentProject.infoText}</p>
          </div>
        </div>
        <div className="container-right">
          <div className="info-points">
            {currentProject.infoPoints.map((point, index) => (
              <div key={index} className="info-point">
                <img className="info-svgs" src={svgMap[point.svgKey]} alt="" />
                <p>{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="button-container">
        <Link
          to={currentProject.url}
          className="btn-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Live Page
        </Link>
      </div>
    </div>
  );

  return (
    <div className="projects page">
      <h2 className="title">Previous Work</h2>
      <p className="title-caption">Select a project</p>
      <div className="projects-content">
        <div className="project-cards">
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
            <h2 className="card-title">Movie Binge</h2>{" "}
            {/* Title moved to bottom */}
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
