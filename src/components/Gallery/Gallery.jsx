import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import "./Gallery.css";

const images = ["https://res.cloudinary.com/dtuqpup4a/image/upload/fl_preserve_transparency/v1727411412/img1_vxxuqd.jpg?_s=public-apps", "https://res.cloudinary.com/dtuqpup4a/image/upload/fl_preserve_transparency/v1727411415/img4_cjreoa.jpg?_s=public-apps", "https://res.cloudinary.com/dtuqpup4a/image/upload/fl_preserve_transparency/v1727411419/img3_zxgemk.jpg?_s=public-apps", "https://res.cloudinary.com/dtuqpup4a/image/upload/fl_preserve_transparency/v1727411415/img4_cjreoa.jpg?_s=public-apps", "https://res.cloudinary.com/dtuqpup4a/image/upload/fl_preserve_transparency/v1727411415/img4_cjreoa.jpg?_s=public-apps"];

const Gallery = () => {
  const [positions, setPositions] = useState([0, 1, 2, 3, 4]);
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  if (inView) {
    controls.start("visible");
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const newPositions = [...positions];
      const last = newPositions.pop(); // Remove the last element
      newPositions.unshift(last); // Add it to the beginning
      setPositions(newPositions);
    }, 3000); // Change image every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [positions]);

  return (
    <>
      <h1 className="mediaText">GALLERY</h1>
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0.8, x: -200 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 1 }}
      >
        <div className="gallery">
          {positions.map((pos, index) => (
            <div
              key={index}
              className="item"
              data-pos={pos}
              onClick={() =>
                setPositions((prevPositions) => {
                  const newPositions = [...prevPositions];
                  const heroIndex = newPositions.indexOf(0);
                  [newPositions[heroIndex], newPositions[index]] = [
                    newPositions[index],
                    newPositions[heroIndex],
                  ];
                  return newPositions;
                })
              }
            >
              <img src={images[index]} alt={`Gallery item ${index}`} />
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Gallery;
