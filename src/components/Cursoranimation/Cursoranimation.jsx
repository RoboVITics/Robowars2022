import React, { useEffect, useRef } from "react";
import "./Cursoranimation.css"; // Import the CSS file for styling

const CircleEffect = () => {
  const circlesRef = useRef([]);
  const colors = [
    "#ffb56b",
    "#fdaf69",
    "#f89d63",
    "#f59761",
    "#ffb56b",
    "#fdb063",
    "#faaa5b",
    "#f8a453",
    "#f59f4b",
    "#f29943",
    "#ef933b",
    "#ec8e33",
    "#e9882b",
    "#e68223",
    "#e37c1b",
    "#e07713",
    "#dc710b",
    "#d96b03",
    "#d66402",
    "#d35e02",
    "#d05702",
    "#cd5101",
    "#ca4a01",
    "#c64401",
    "#c33d01",
    "#c03601",
  ];

  useEffect(() => {
    const circles = circlesRef.current;
    const coords = { x: 0, y: 0 };

    // Set initial properties for circles
    circles.forEach((circle, index) => {
      circle.x = 0;
      circle.y = 0;
      circle.style.backgroundColor = colors[index % colors.length];
    });

    // Mouse move event handler
    const handleMouseMove = (e) => {
      coords.x = e.clientX;
      coords.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const animateCircles = () => {
      let x = coords.x;
      let y = coords.y;

      circles.forEach((circle, index) => {
        circle.style.left = `${x - 12}px`;
        circle.style.top = `${y - 12}px`;
        circle.style.transform = `scale(${
          (circles.length - index) / circles.length
        })`;

        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
      });

      requestAnimationFrame(animateCircles);
    };

    animateCircles();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [colors]);

  return (
    <div>
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="circle"
          ref={(el) => (circlesRef.current[index] = el)}
          style={{ position: "absolute" }}
        />
      ))}
    </div>
  );
};

export default CircleEffect;
