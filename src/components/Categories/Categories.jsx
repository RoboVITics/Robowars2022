import React, { useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import "./Categories.css";
import { EarthCanvas } from "../canvas/Earth";
import { EarthCanvas2 } from "../canvas/Earth2";
import { EarthCanvas3 } from "../canvas/Earth3";
const Categories = () => {
  const controls = useAnimation();

  // Ref for in-view detection
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  // Start animation when in view
  if (inView) {
    controls.start("visible");
  }
  return (
    <>
      <h2 className="aboutUsText">Categories</h2>
      <motion.div
        className="categories"
        id="categories"
        ref={ref}
        variants={{
          hidden: { opacity: 0.8, x: -200 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 1 }}
      >
        <div className="robot1">
          <h2 className="category">8 KG</h2>
          <div className="white-container">
            <EarthCanvas></EarthCanvas>
          </div>
        </div>
        <div className="robot2">
          <h2 className="category">15 KG</h2>

          <div className="white-container">
            <EarthCanvas2></EarthCanvas2>
          </div>
        </div>

        <div className="robot3">
          <h2 className="category">60 KG</h2>

          <div className="white-container">
            <EarthCanvas3></EarthCanvas3>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Categories;
