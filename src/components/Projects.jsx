import React from "react";
import hThumb from "../assets/images/horizon-thumb.png";
import mThumb from "../assets/images/movie-binge-thumb.png";
import { IoIosPerson } from "react-icons/io";

import hGif from "../assets/gif/horizon-sales.gif";

const Projects = () => {
  const InfoCard = ({ gif }) => (
    <div className="project-info-container">
      <h2 className="info-title">Title</h2>
      <div className="info-content">
        <div className="container-left">
          <div className="gif-container">
            <img className="thumb" src={gif} alt="" />
          </div>
          <div className="info-text-container">
            <p className="info-text">
              A movie rating website, using TMDB database, listing
              latest/trending/popular movies. Users sign up and can rate/review
              movies, search based on criteria or genre and receive all the info
              on the movie.
            </p>
          </div>
        </div>
        <div className="container-right">
          <div className="info-points">
            <div className="info-point">
              <IoIosPerson />

              <p>Ai Chatbot</p>
            </div>
            <div className="info-point">
              <IoIosPerson />

              <p>Email Integration</p>
            </div>
            <div className="info-point">
              <IoIosPerson />

              <p>Page Questionnaire</p>
            </div>
            <div className="info-point">
              <IoIosPerson />

              <p>Secured Webpage</p>
            </div>
            <div className="info-point">
              <IoIosPerson />

              <p>Mobile Friendly</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div className="projects page">
      <h2 className="title">Previous Work</h2>
      <p className="title-caption">Select a project</p>
      <div className="projects-content">
        <div className="project-cards">
          <div className="card card-1">
            <div className="image-container">
              <img className="card-thumbnail" src={hThumb} alt="" />
            </div>

            <h2 className="card-title">Horizon Sales</h2>
          </div>
          <div className="card card-2">
            <div className="image-container">
              <img className="card-thumbnail" src={mThumb} alt="" />
            </div>

            <h2 className="card-title">Movie Binge</h2>
          </div>
        </div>
        <div className="projects-info">
          <InfoCard gif={hGif} />
        </div>
      </div>
    </div>
  );
};

export default Projects;
