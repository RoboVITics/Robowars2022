import React from "react";
import { useNavigate } from "react-router-dom";
import "./Watchlive.css";

const Watchlive = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="video-container">
        <h1 style={{ marginTop: "3%" }}>Watch Live</h1>
        <iframe
          src="https://www.youtube.com/embed/bRGWPYwcvZU" // Corrected embed link
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <button
        className="home-btn"
        onClick={() => {
          navigate("/");
        }}
      >
        Go Home
      </button>
    </>
  );
};

export default Watchlive;
