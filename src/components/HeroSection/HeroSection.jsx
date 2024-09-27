import React, { useEffect, useRef } from "react";
import "./HeroSection.css";
import { Route, useNavigate } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const HeroSection = () => {
  const handleWatchLiveClick = () => {
    navigate("/watchlive"); // Add this function for Watch Live navigation
  };
  const navigate = useNavigate();
  const threeContainerRef = useRef(null);
  const inView = useInView(threeContainerRef, { once: true });
  const controls = useAnimation();
  if (inView) {
    controls.start("visible");
  }

  const handleMatchesClick = () => {
    navigate("/fixture");
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50, // Reduced FOV to lessen perspective distortion
      window.innerWidth / window.innerHeight,
      1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(700, 700);
    document
      .getElementById("three-robot-model")
      .appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    loader.load("untitledhello3_new.gltf", (gltf) => {
      const model = gltf.scene;
      model.rotation.y = Math.PI / 4;

      const adjustModelScale = () => {
        if (window.innerWidth < 600) {
          model.scale.set(0.5, 1, 0.5);
        } else if (window.innerWidth < 1300) {
          model.scale.set(2.2, 1.2, 1.2); // Increase scale for smaller screens
        } else {
          model.scale.set(1.4, 1.4, 1.4); // Default scale for larger screens
        }
      };

      adjustModelScale();

      model.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(0xffffff);
        }
      });

      scene.add(model);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false;
      controls.maxPolarAngle = Math.PI / 2;

      camera.position.set(0, 0, 10); // Move camera farther along the z-axis to reduce perspective distortion
      const light = new THREE.PointLight(0xff0000, 1, 100);
      light.position.set(50, 50, 50);
      scene.add(light);

      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
      directionalLight.position.set(0, 10, 10).normalize();
      scene.add(directionalLight);

      const animate = () => {
        requestAnimationFrame(animate);
        model.rotation.y += 0.005;
        renderer.render(scene, camera);
      };

      animate();
    });

    const handleResize = () => {
      const newWidth = 900;
      const newHeight = 1000;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      const threeContainer = document.getElementById("three-robot-model");
      if (threeContainer && threeContainer.contains(renderer.domElement)) {
        threeContainer.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <motion.div
      className="hero-section"
      id="hero"
      ref={threeContainerRef}
      variants={{
        hidden: { opacity: 0.8, x: -200 },
        visible: { opacity: 1, x: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 1 }}
    >
      <div>
        <div id="three-robot-model"></div>
      </div>
      <div className="content">
        <div className="title">
          <h1 className="herologo">ROBOWARS</h1>
        </div>
        <h2>
          FORGE<div>.</div>BATTLE<div>.</div>WRECK
        </h2>
        <p>
          EXPERIENCE THE THRILL OF COMBAT ROBOTICS AT ROBOWARS. REGISTER NOW TO
          BOOK YOUR SEAT AND WITNESS THE CLASH OF ROBOTS.
        </p>
        <div className="buttons">
          <button className="watch-live" onClick={handleWatchLiveClick}>
            Watch Live
          </button>
          <button className="matches" onClick={handleMatchesClick}>
            Matches
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
