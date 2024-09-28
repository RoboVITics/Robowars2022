import { motion, useAnimation, useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { HashLink as Link } from "react-router-hash-link";
import robovitics from "../../assets/robovitics logo.png";
import gravitas from "../../assets/newgravlogo.svg";
import hamburger from "../../assets/hamburger.png";
import "./Navbar.css";

const Navbar = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  if (inView) {
    if (window.innerWidth < 1000) {
      for (var i = 0; i < 6; i = i + 1) {
        document
          .querySelectorAll(".link")
          [i].addEventListener("click", function () {
            document.querySelector(".navbar-toggler").click();
          });
      }
    } else {
      if (document.getElementById("home")) {
        var lastScrollY = window.scrollY;
        window.addEventListener("scroll", () => {
          if (lastScrollY <= window.scrollY) {
            controls.start("up");
          } else {
            controls.start("down");
          }
          lastScrollY = window.scrollY;
        });
      }
    }
  }
  const controls = useAnimation();
  useEffect(() => {
    setTimeout(() => {
      controls.start("visible");
    }, 2000);
  });

  return (
    <div id="home">
      <motion.nav
        class="navbar navbar-expand-lg navbar-light fixed-top custom-navbar"
        id="nav"
        ref={ref}
        variants={{
          hidden: { opacity: 0, y: -50 },
          visible: { opacity: 1, y: 0 },
          up: {
            y: -100,
            transition: {
              duration: 0,
            },
          },
          down: {
            y: -2,
            transition: {
              duration: 0,
            },
          },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 1 }}
        style={
          window.innerWidth < 1000
            ? { padding: 0 }
            : {
                paddingTop: "20px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",

                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }
        }
      >
        <div class="container-fluid">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ background: "none" }}
          >
            {window.innerWidth < 900 ? <img src={hamburger} alt="" /> : null}
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link to="#home" className="link">
                  <img src={robovitics} alt="" />
                </Link>
              </li>
              <li className="nav-item text-link">
                <Link to="#hero" className="link no-wrap">
                  Home
                </Link>
              </li>
              <li className="nav-item text-link">
                <Link to="#aboutUsSection" className="link no-wrap">
                  About Us
                </Link>
              </li>
              <li className="nav-item text-link">
                <Link to="/fixture" className="link no-wrap">
                  Matches
                </Link>
              </li>
              <li className="nav-item text-link">
                <Link to="#faqsection" className="link no-wrap">
                  FAQs
                </Link>
              </li>
              <li className="nav-item text-link">
                <Link to="#contact" className="link no-wrap">
                  Contact Us
                </Link>
              </li>
              <li className="nav-item gravitas-logo">
                <Link to="#home" className="link last">
                  <img src={gravitas} alt="" style={{ marginTop: "-25px" }} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
