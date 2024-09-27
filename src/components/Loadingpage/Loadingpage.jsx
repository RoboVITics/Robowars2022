import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef } from "react";
import "./Loadingpage.css";
import image from "../../assets/war logo.gif"; // Import the image

const Progressbar = ({ value }) => {
  // No need to pass `image` as a prop
  const progressRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    if (value === 100) {
      setTimeout(() => {
        controls.start("fading");
      }, 1000);
    }
  }, [value, controls]);

  return (
    <motion.div
      className="progressbar-container"
      ref={progressRef}
      variants={{
        fading: { opacity: 0, y: "100%" }, // Fade out and slide down
      }}
      initial={{
        opacity: 1,
        y: 0,
      }}
      animate={controls}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="logo-container">
        <img src={image} className="loading-logo" alt="Logo" />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="bar-contain"
      >
        <div className="progressbar">
          <motion.div
            className="bar"
            animate={{
              width: `${value}%`, // Animate width based on the progress value
            }}
            transition={{
              ease: "linear", // Smooth linear transition
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Progressbar;
